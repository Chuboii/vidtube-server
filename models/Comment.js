import mongoose from "mongoose"

const CommentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  videoId: {
    type: String,
    required: true
  },
  photoURL:{
  type:String,
  required:true
  },
  comment: {
    type: String
  }
}, {
  timestamps: true
})

export default mongoose.model("Comments", CommentSchema)