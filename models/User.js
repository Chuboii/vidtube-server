import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    required: true,
    type: String,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
  },
  img: {
    type: String,
  },
  subscribers: {
    type: Number,
    default: 0,
  },
  subscribedUsers: {
    type: [],
    required: true,
  },
  fromGoogle: {
    type: Boolean,
    default: false
  },
  token: {
    type: String,
  }
  }, {
    timestamps: true
})
  

  export default mongoose.model("Users", UserSchema)