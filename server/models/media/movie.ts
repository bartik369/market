import mongoose from "mongoose";

const   MovieScheme = new mongoose.Schema({
    id: {
        type: String,
    },
    title: {
        type: String,
    },
    genre: {
        type: String,
    },
    year: {
        type: Number,
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
    time: {
        type: Number,
    },
    actors: {
        type: [],
    },
});

const Movie = mongoose.model("Movie", MovieScheme);

export default Movie;