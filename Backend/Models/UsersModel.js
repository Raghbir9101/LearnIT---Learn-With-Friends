import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
    userName: { type: String },
    isAdmin: { type: Boolean },
})

const UsersModel = mongoose.model("user", usersSchema);

export default UsersModel;
