import {
  IMovie,
  ISearch,
  IFilterMovie,
  IMovieRatind,
  IMovieAddFavorite,
  IMovieFavorites,
  IMovieTitles,
  IExistFavorite,
  IMovieProperties,
} from './../types/media';
import { createSlice, PayloadAction, createAsyncThunk, AnyAction} from '@reduxjs/toolkit';
import axios from 'axios';
import ENV from '../env.config';
import * as contentConst from '../utils/constants/content'

type MovieState = {
  list: IMovie[];
  top: IMovie[];
  movie: IMovieTitles;
  favorites: string[];
  search: IMovie[];
  loading: boolean;
  error: null | string;
  filter: IFilterMovie;
  properties: IMovieProperties;
};

const initialState: MovieState = {
  list: [],
  top: [],
  movie: {
    titleRu: '',
    titleEn: '',
  },
  favorites: [],
  search: [],
  filter: {
    category: [],
    country: [],
    year: [],
    rating: [],
  },
  properties: {
    genre: [],
    country: [],
    year: [],
    rating: [],
  },

  loading: false,
  error: null,
};

export const getMovie = createAsyncThunk<IMovie, string>(
  'movie/getMovie',
  async function (id, { rejectWithValue }) {
    const res = await axios.get(`${ENV.API_URL}${ENV.API_MOVIE}${id}`);

    if (!res.data) {return rejectWithValue(contentConst.serverError);}
    return (await res.data) as IMovie;
  }
);

export const getProperties = createAsyncThunk<any, undefined, { rejectValue: String }>(
 'movie/getProperties', 
  async function (_, { rejectWithValue }) {
  const res = await axios.get(`${ENV.API_URL}${ENV.API_MOVIE_PROPERTIES}`);

  if (!res.data) {return rejectWithValue(contentConst.serverError);}
  return (await res.data) as IMovie;
});

export const getMovies = createAsyncThunk<IMovie[], IFilterMovie,{ rejectValue: String}>(
  'movie/getMovies', 
  async function (filterData, { rejectWithValue }) {
  const res = await axios.post(`${ENV.API_URL}${ENV.API_MOVIES}`, filterData, {
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.data) {return rejectWithValue(contentConst.serverError);}
  return res.data;
});

export const getLastMovies = createAsyncThunk<IMovie[], undefined, { rejectValue: String }>(
'movie/getLastMovies', 
 async function (_, { rejectWithValue }) {
  const res = await axios.get(`${ENV.API_URL}${ENV.API_LAST_MOVIES}`, {
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.data) {return rejectWithValue(contentConst.serverError);}
  return res.data;
});

export const getTopMovies = createAsyncThunk<IMovie[],undefined,{ rejectValue: String }>(
'movie/getTopMovies', 
async function (_, { rejectWithValue }) {
  const res = await axios.get(`${ENV.API_URL}${ENV.API_TOP_MOVIES}`, {
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.data) {return rejectWithValue(contentConst.serverError);}
  return res.data;
});

export const createMovie = createAsyncThunk<IMovie, any, { rejectValue: String }>(
  'movie/createMovie', async function (movieData, { rejectWithValue }) {
  const res = await axios.post(`${ENV.API_URL}${ENV.API_ADD_MOVIE}`, movieData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  if (!res.data) { return rejectWithValue(contentConst.serverError); }
  return res.data;
});

export const searchMovie = createAsyncThunk<IMovie[], ISearch, { rejectValue: String}>(
  'movie/searchMovie', 
  async function (searchRequest, { rejectWithValue }) {
  const res = await axios.post(`${ENV.API_URL}${ENV.API_SEARCH_MOVIE}`, searchRequest,
    { headers: { 'Content-Type': 'application/json' },}
  );

  if (!res) { return rejectWithValue(contentConst.serverError);}
  return res.data;
});
export const setRating = createAsyncThunk<unknown, IMovieRatind, { rejectValue: String }>(
  'movie/setRating', 
  async function (ratingData, { rejectWithValue }) {
  const res = await axios.post(`${ENV.API_URL}${ENV.API_SET_MOVIE_RATING}`, ratingData, {
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res) { return rejectWithValue(contentConst.serverError); }
  return res.data;
});

export const addFavorite = createAsyncThunk<unknown, IMovieAddFavorite,{ rejectValue: String }>(
  'movie/addFavorite',
  async function (ratingData, { rejectWithValue }) {
  const res = await axios.post(`${ENV.API_URL}${ENV.API_MOVIE_FAVORITE}`, ratingData, {
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res) { return rejectWithValue(contentConst.serverError); }
  return res.data;
});

export const getFavorites = createAsyncThunk<IMovieFavorites, IExistFavorite,{ rejectValue: String }>(
  'movie/getFavorites', async function (id, { rejectWithValue }) {
  const res = await axios.post(`${ENV.API_URL}${ENV.API_MOVIES_FAVORITES}`, id, {
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res) {return rejectWithValue(contentConst.serverError);}
  return res.data;
});

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    deleteSearch: (state, action) => {
      state.search = action.payload;
      state.loading = false;
    },
    setMovieCategory: (state, action) => {
      state.filter.category.includes(action.payload)
        ? (state.filter.category = state.filter.category.filter(
            (el) => el !== action.payload
          ))
        : state.filter.category.push(action.payload);
    },
    setMovieCountry: (state, action) => {
      state.filter.country.includes(action.payload)
        ? (state.filter.country = state.filter.country.filter(
            (el) => el !== action.payload
          ))
        : state.filter.country.push(action.payload);
    },
    setMovieYear: (state, action) => {
      state.filter.year.includes(action.payload)
        ? (state.filter.year = state.filter.year.filter(
            (el) => el !== action.payload
          ))
        : state.filter.year.push(action.payload);
    },
    setMovieRating: (state, action) => {
      state.filter.rating.includes(action.payload)
        ? (state.filter.rating = state.filter.rating.filter(
            (el) => el !== action.payload
          ))
        : state.filter.rating.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovie.fulfilled, (state, action) => {
        state.movie.titleRu = action.payload.titleRu;
        state.movie.titleEn = action.payload.titleEn;
      })
      .addCase(getMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLastMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLastMovies.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(getTopMovies.fulfilled, (state, action) => {
        state.top = action.payload;
        state.loading = false;
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(createMovie.pending, (state) => {
        state.error = null;
      })
      .addCase(createMovie.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(searchMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMovie.fulfilled, (state, action) => {
        state.search = action.payload;
        state.loading = false;
      })
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload.movies;
      })
      .addCase(getProperties.fulfilled, (state, action) => {
        state.properties.genre = action.payload.genreArr;
        state.properties.country = action.payload.countryArr;
        state.properties.year = action.payload.yearArr;
        state.properties.rating = action.payload.ratingArr;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default movieSlice.reducer;
export const {
  deleteSearch,
  setMovieCategory,
  setMovieCountry,
  setMovieYear,
  setMovieRating,
} = movieSlice.actions;

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};
