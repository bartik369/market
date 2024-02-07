import mongoose from "mongoose";

const ActorScheme = new mongoose.Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
    },
    surname: {
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