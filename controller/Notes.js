import { Note } from "../model/Note.js";
import nodemailer from 'nodemailer';
import dotenv from "dotenv"
dotenv.config();
const EMAIL=process.env.EMAIL;
const PASSWORD=process.env.PASSWORD;
export const createNote = async (req, res) => {
  const note = new Note(req.body);
  try {
    const doc = await note.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getAllNotes = async (req, res) => {
  const id = req.query.id;
  try {
    const docs = await Note.find({ user_id: id });
    res.status(200).json(docs);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const updateNote = async (req, res) => {
  const note_id = req.query.id;
  try {
    const docs = await Note.findOneAndUpdate({ _id: note_id }, req.body, { new: true }).exec();
    res.status(200).json(docs);
  } catch (err) {
    res.status(404).json(err);
  }
};

export const deleteNote = async (req, res) => {
  const note_id = req.query.id;
  try {
    const docs = await Note.findByIdAndDelete(note_id).exec();
    res.status(200).json(docs);
  } catch (err) {
    res.status(404).json(err);
  }
};

export const getAllStarredNotes = async (req, res) => {
  const id = req.query.id;
  try {
    const docs = await Note.find({ user_id: id, starred: true }).exec();
    res.status(200).json(docs);
  } catch (err) {
    res.status(404).json(err);
  }
};

export const searchNotes = async (req, res) => {
  const { id, q, starred } = req.query;
  if (starred === "true") {
    try {
      const docs = await Note.find({ user_id: id, title: { $regex: q, $options: "i" }, starred: true }).exec();
      res.status(200).json(docs);
    } catch (err) {
      res.status(404).json(err);
    }
  }
  else {
    try {
      const docs = await Note.find({ user_id: id, title: { $regex: q, $options: "i" } }).exec();
      res.status(200).json(docs);
    } catch (err) {
      res.status(404).json(err);
    } 
  }

};



export const sendNotes = (req, res) => {

  const { email,content,title,category,id } = req.body;


  let config = {
    service: 'gmail',
    auth: {
      user: EMAIL,
      pass: PASSWORD
    }
  }

  let transporter = nodemailer.createTransport(config);



  const htmlContent = `
<html>
  <head>
    <style>
      /* Add your CSS styles here */
      body {
        font-family: Arial, sans-serif;
        background-color: #f0f0f0;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
        border:1px solid black;
      }
      h3{
          color: green;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1><center>${title}</center></h1>
      <h3><center>${category}</center></h3>
      <hr>
      ${content}
    </div>
  </body>
</html>
`;

  let message = {
    from: { name: "NoteMon", address: EMAIL },
    to: email,
    subject: `Note #${id}`,
    html: htmlContent
  }

  transporter.sendMail(message).then(() => {
    return res.status(201).json({
      msg: "you should receive an email"
    })
  }).catch(error => {
    return res.status(500).json({ error })
  })


}


