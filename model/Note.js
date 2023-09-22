import mongoose from 'mongoose';
const { Schema } = mongoose;

const noteSchema = new Schema({
  title:{type:String,required:true},
  category:{type:String,required:true},
  content:{type:String,required:true},
  starred:{type:Boolean,default:false},
  date:{type:String,required:true},
  user_id:{type:String,required:true} 
});

export const Note = mongoose.model('Note', noteSchema);