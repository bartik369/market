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
    id?: string;
    name_en: string;
    name_ru: string;
    picture?: string;
    link?: string;
}
export interface IActorData {
    id?: string,
    name_en: string;
    name_ru: string;
    picture?: string;
    link?: string;
    file?: File | null
}
// export interface IFile {
//     lastModified: number;
//     lastModifiedDate: Date;
//     name: string;
//     size: number;
//     type: string;
//     webkitRelativePath: string;
// }
