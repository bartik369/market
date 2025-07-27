type FetcherOptions = RequestInit & { skipAuth?: boolean }

let isRefreshing = false
let failedQueue: {
  resolve: (value: string) => void
  reject: (reason?: any) => void
}[] = []

function processQueue(error: Error | null, token: string | null = null) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error)
    } else {
      if (token) {
        resolve(token)
      }
    }
  })
  failedQueue = []
}

async function refreshToken(): Promise<string> {
  const res = await fetch('/api/auth/refresh', {
    method: 'POST',
    credentials: 'include',
  })
  if (!res.ok) throw new Error('Failed to refresh token')
  const data = await res.json()
  const newToken = data.accessToken
  if (!newToken) throw new Error('No token in refresh response')
  localStorage.setItem('accessToken', newToken)
  return newToken
}

export async function fetcher<T>(url: string, options: FetcherOptions = {}): Promise<T> {
  const token = localStorage.getItem('accessToken')
  const headers = new Headers(options.headers)

  if (!options.skipAuth && token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const res = await fetch(url, {
    ...options,
    headers,
  })

  if (res.status === 401 && !options.skipAuth) {
    if (isRefreshing) {
      return new Promise<T>((resolve, reject) => {
        failedQueue.push({
          resolve: (newToken: string) => {
            fetch(url, {
              ...options,
              headers: new Headers({
                ...Object.fromEntries(headers.entries()),
                Authorization: `Bearer ${newToken}`,
              }),
            })
              .then(async (r) => {
                if (!r.ok) throw new Error(`HTTP error: ${r.status}`)
                resolve(await r.json())
              })
              .catch(reject)
          },
          reject,
        })
      })
    }

    isRefreshing = true
    try {
      const newToken = await refreshToken()
      processQueue(null, newToken)
      isRefreshing = false

      const retryHeaders = new Headers(options.headers)
      retryHeaders.set('Authorization', `Bearer ${newToken}`)

      const retryRes = await fetch(url, {
        ...options,
        headers: retryHeaders,
      })

      if (!retryRes.ok) throw new Error(`HTTP error: ${retryRes.status}`)

      return await retryRes.json()
    } catch (err) {
      processQueue(err as Error, null)
      isRefreshing = false
      // добавить logout
      throw err
    }
  }

  if (!res.ok) {
    throw new Error(`HTTP error: ${res.status}`)
  }

  return res.json()
}
