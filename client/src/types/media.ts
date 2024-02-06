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
    media: FileList | null,
}
