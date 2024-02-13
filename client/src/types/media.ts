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
    title_en: string;
    title_ru: string;
    genre: string[];
    year: string;
    country: string;
    description: string;
    director: string;
    time: string;
    actors: string[];
}
export interface IActor {
    _id?: string;
    name_en: string;
    name_ru: string;
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
