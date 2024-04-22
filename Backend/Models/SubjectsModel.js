import mongoose from "mongoose";

const subjectSchema = mongoose.Schema({
    name: { type: String },
    creator: { type: String },
    creationDate: { type: String },
})
                
const SubjectsModel = mongoose.model("subjects", subjectSchema);

export default SubjectsModel;
