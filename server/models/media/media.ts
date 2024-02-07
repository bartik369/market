import mongoose from "mongoose";

const TodoScheme = new mongoose.Schema({
    id: {
        type: String,
    },
    title: {
        type: String,
    },
    category: {
        type: String,
    },
    description: {
        type: String,
    },
    director: {
        type: String,
    },
    actors: {
        type: Array,
    },
    status: {
        type: String,
    },
});

const Todo = mongoose.model("Todo", TodoScheme);

export default Todo;