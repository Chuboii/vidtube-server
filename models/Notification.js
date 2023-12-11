import mongoose from 'mongoose'

const NotificationSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    name: {
        type:String
    },
    desc: {
        type:String
    },
    photoUrl: {
        type:String
    },
    thumbnail: {
        type:String
    },
    videoName: {
        type:String
    }
}, { timestamps: true })

export default mongoose.model("Notifications", NotificationSchema)