import mongoose from "mongoose";

const ActorScheme = new mongoose.Schema({
    name_en: {
        type: String,
    },
    name_ru: {
        type: String,
    },
    picture: {
        type: String,
    },
    extInfo: {
        birthday: {
            type: String,
        },
        country: {
            type: String,
        },
        city: {
            type: String,
        },
        gender: {
            type: String,
        },
        height: {
            type: String,
        },
        genre: [],
    }
});

const Actor = mongoose.model("Actor", ActorScheme);

export default Actor;