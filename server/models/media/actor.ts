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
    link: {
        type: String,
    },
});

const Actor = mongoose.model("Actor", ActorScheme);

export default Actor;