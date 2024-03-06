import { url } from "inspector";

export interface IMedia {
    name: string;
    category: string;
    description: string;
    duration: string;
    year: number;
    rating: number;
}
export interface IMovie {
    _id?: string;
    titleEn: string;
    titleRu: string;
    picture: string;
    trailer?: string;
    genre: string[];
    year: string;
    country: string;
    description: string;
    director: string;
    ageCategory: string;
    time: string;
    actors: string[];
    rating: number | null;
}
export interface IActor {
    _id?: string;
    nameEn: string;
    nameRu: string;
    picture: string;
    extInfo: IActorExt;
}
export interface IActorExt {
    birthday: number;
    country: string;
    city: string;
    gender: string;
    height: string;
    genre: string[];
}
export interface ISearch {
    search: string;
}
export interface IMovieRatind {
    id: string;
    value: number;
}
export interface IMovieAddFavorite {
    userId: string;
    movieId: string;
}
export interface IMovieFavorites {
    userId: string;
    movies: string[];
}
export interface IExistFavorite {
    id: string
}

export interface IFilterMovie {
    category: IFilterCategory[];
    country: string[];
    year: string;
    rating: string;
}
export interface IFilterCategory {
    id: number;
    value: boolean;
}

