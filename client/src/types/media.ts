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
    id: string;
    title: string;
    category: string;
    description: string;
    director: string;
    year: string;
    country: string;
    time: number;
    age: string;
    media: FileList | null;
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
