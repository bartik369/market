import mongoose from "mongoose";

const   MovieSchema = new mongoose.Schema({
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
    trailer: {
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
    raiting: {
        type: Number,
        default: 0,
    }
});

const Movie = mongoose.model("Movie", MovieSchema);

export default Movie;