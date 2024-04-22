import { Router } from "express";
import CrudApi from "../Utils/CrudController.js";
import QuestionsModel from "../Models/QuestionsModel.js";


let QuestionsRouter = new Router();

let instance = new CrudApi("/questions", QuestionsModel, QuestionsRouter)

export default QuestionsRouter;