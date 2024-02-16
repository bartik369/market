import mongoose from "mongoose";

const   MovieScheme = new mongoose.Schema({
    id: {
        type: String,
    },
    titleEn: {
        type: String,
    },
    titleRu: {
        type: String,
    },
    picture: {
        type: String,
    },
    genre: {
        type: [],
    },
    year: {
        type: String,
    },
    country: {
        type: String,
    },
    description: {
        type: String,
    },
    director: {
        type: String,
    },
    ageCategory: {
        type: String,
    },
    time: {
        type: String,
    },
    actors: {
        type: [],
    },
});

const Movie = mongoose.model("Movie", MovieScheme);

export default Movie;