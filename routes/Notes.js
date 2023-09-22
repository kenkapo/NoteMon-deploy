import express from "express";
import { createNote, getAllNotes ,updateNote,deleteNote,getAllStarredNotes, searchNotes,sendNotes} from '../controller/Notes.js';

const router = express.Router();

router
    .post('/add', createNote)
    .post('/send',sendNotes)
    .get("/all",getAllNotes)
    .get("/all/star",getAllStarredNotes)
    .get("/search",searchNotes)
    .patch("/update",updateNote)
    .delete("/delete",deleteNote);

export default { router };