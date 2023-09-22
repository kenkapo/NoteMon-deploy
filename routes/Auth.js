import express from "express";
import { createUser, getAllUsers, checkUser, updateUser } from '../controller/Auth.js';

const router = express.Router();

router
    .post('/signup', createUser)
    .get("/all", getAllUsers)
    .get("/check", checkUser)
    .put("/update", updateUser);

export default { router };