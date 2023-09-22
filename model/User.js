import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  email:{type:String,required:true,unique:true},
  password:{type:String,required:true},
  user_img:{type:String},
  bg_img:{type:String},
  full_name:{type:String, required:true},
  biography:{type:String},
  count:{type:Number,default:0} 
});

export const User = mongoose.model('User', userSchema);