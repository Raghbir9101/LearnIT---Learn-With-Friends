import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    content: { type: String },
    creator: { type: String },
    creationDate: { type: String },
    questionID: { type: String },
})

const CommentsModel = mongoose.model("comments", commentSchema);

export default CommentsModel;
