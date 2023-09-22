import { User } from "../model/User.js";

export const createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    const doc = await user.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const docs = await User.find({}).exec();
    res.status(200).json(docs);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const checkUser = async (req, res) => {
  const user_email = req.query.email;
  try {
    const docs = await User.find({ email: user_email }).exec();
    res.status(200).json(docs);
  } catch (err) {
    res.status(404).json(err);
  }
};

export const updateUser = async (req, res) => {
  const user_id = req.query.id;
  try {
    const docs = await User.findByIdAndUpdate({ _id: user_id }, req.body, { new: true }).exec();
    res.status(200).json(docs);
  } catch (err) {
    res.status(404).json(err);
  }
};
