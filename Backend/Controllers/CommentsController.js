import { Router } from "express";
import CrudApi from "../Utils/CrudController.js";
import CommentsModel from "../Models/CommentsModel.js";

let CommentsRouter = new Router();

let instance = new CrudApi("/users", CommentsModel, CommentsRouter)

export default CommentsRouter;