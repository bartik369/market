export interface IAccessToken {
    user: {
        _id: string;
        email: string;
        roles: string[];
        member: string[];
    }
}


// {
//     "user": {
//       "_id": "65d66226f7118dcf0c44c0fb",
//       "email": "admin@cinema.ru",
//       "roles": [
//         "USER"
//       ],
//       "member": [
//         "START"
//       ],
//       "__v": 0
//     },
//     "iat": 1708969893,
//     "exp": 1708969913
//   }