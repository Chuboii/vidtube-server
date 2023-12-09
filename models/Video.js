import mongoose from "mongoose"

const VideoSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: String,
  photoUrl: String,
  desc: {
    type: String,
  },
  title: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
  views: {
    type: Number,
    default: 0
    },
    likes: {
      type: [String],
    default: []
    },
    likesCount: {
      type: Number,
    default: 0
    },
    tags: {
      type: [String],
    default: []
    }

  }, {
    timestamps: true
  })

  export default mongoose.model("Videos", VideoSchema)