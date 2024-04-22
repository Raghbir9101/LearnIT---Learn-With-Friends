import express from 'express';
const app = express();
import cors from 'cors';
const port = process.env.PORT || 80;
import path, { dirname } from "path";
import { connection } from './db.js';
import UsersRouter from './Controllers/UserController.js';
import QuestionsRouter from './Controllers/QuestionsController.js';
import SubjectsRouter from './Controllers/SubjectsController.js';
import CommentsRouter from './Controllers/CommentsController.js';
import UsersModel from './Models/UsersModel.js';
import { fileURLToPath } from "url";
app.use(express.json({ limit: '50mb' }));
app.use(express.static('build'));
app.use(cors());
const _dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.json({ limit: '50mb' }));
app.use(express.static('../FrontEnd/dist'));
app.use("/api", UsersRouter);
app.use("/api", QuestionsRouter);
app.use("/api", SubjectsRouter);
app.use("/api", CommentsRouter);

app.get("/", (req, res) => {
    res.sendFile(path.join(_dirname, "../FrontEnd", "dist", "index.html"));
})

app.get("/subject", (req, res) => {
    res.sendFile(path.join(_dirname, "../FrontEnd", "dist", "index.html"));
})

app.get("/subject/:route", (req, res) => {
    res.sendFile(path.join(_dirname, "../FrontEnd", "dist", "index.html"));
})

app.post("/api/login", async (req, res) => {
    const userExists = await UsersModel.findOne({ userName: req.body.userName }).lean();
    if (userExists) {
        return res.send(userExists)
    }
    const newUser = await UsersModel.create({ userName: req.body.userName, isAdmin: false })
    return res.send(newUser)
})

app.listen(port, async () => {
    try {
        await connection
        console.log("Connected to db")
    } catch (err) {
        console.log(err)
    }
    console.log("Server Started at PORT", port)
})