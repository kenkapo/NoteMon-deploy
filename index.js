import express from "express";
const app = express();
import path from "path";
import { fileURLToPath } from 'url';

import AuthRouter from "./routes/Auth.js";
import NoteRouter from "./routes/Notes.js";
import mongoose from 'mongoose';
import cors from "cors";


import dotenv from "dotenv";
dotenv.config(); 
const port=process.env.PORT || 8080; 
main().catch(err => console.log(err));
//console.log(process.env.MONGO_URL);
async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("database connected");
}

app.use(cors());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(express.static(path.resolve(__dirname,process.env.PUBLIC_DIR)));



app.use("/user",AuthRouter.router);
app.use("/note",NoteRouter.router);
app.use('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'build','index.html'))
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})   