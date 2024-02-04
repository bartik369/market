import mongoose from "mongoose";

const TodoScheme = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
    },
});

const Todo = mongoose.model("Todo", TodoScheme);

export default Todo;