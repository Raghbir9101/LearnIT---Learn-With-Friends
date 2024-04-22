import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
    question: { type: String },
    answer: { type: String },
    subjectID: { type: String },
    createdBy: { type: String },
})

                
const QuestionsModel = mongoose.model("questions", questionSchema);

export default QuestionsModel;
