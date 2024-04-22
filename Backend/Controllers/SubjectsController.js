import { Router } from "express";
import CrudApi from "../Utils/CrudController.js";
import SubjectsModel from "../Models/SubjectsModel.js";


let SubjectsRouter = new Router();

let instance = new CrudApi("/subjects", SubjectsModel, SubjectsRouter)

export default SubjectsRouter;