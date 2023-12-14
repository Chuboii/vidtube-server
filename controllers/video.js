import videoSchema from "../models/Video.js"
import {
  v4 as uuidv4
} from "uuid"
import {
  createError
} from "../error.js"
import userSchema from "../models/User.js"
//add video

export const addVideo = async(req, res, next)=> {
  try {
    const {
      _id,
      name,
      img,
    } = req.body
    
    const newVideo = new videoSchema({
      userId: _id,
      name,
      photoUrl: img,
      ...req.body
    })
  
    await newVideo.save()

    res.status(201).json(newVideo)
  }

  catch(e) {
    next(e)
  }
}

//get a Video

export const getVideo = async(req, res, next)=> {
  try {
    const {
      id
    } = req.params


    const video = await videoSchema.findById(id)

    if (!video) return next(createError(404, "Video not found"))

    res.status(200).json(video)
  }
  catch(e) {
    next(e)
  }
}

//get any video

export const getChannelVideo = async (req, res, next) => {
  try {
    const { userId } = req.query
    
    const video = await videoSchema.find({
      userId
    })

    if (video.length === 0) return next(createError(404, "Video not found"))

    res.status(200).json(video)

  }
  catch(e) {
    next(e)
  }
}

//delete a video

export const deleteVideo = async(req, res, next)=> {
  try {

    const { id } = req.params

    await videoSchema.findByIdAndDelete(id, {new:true})

    const video = await videoSchema.find({
      userId: req.user.user._id
    })
 
      res.status(200).json(video)
  }
  catch(e) {
    next(e)
  }
}

//edit a Video

export const editVideo = async(req, res, next)=> {
  try {
    const {
      id
    } = req.params

    if (id === req.session.user._id) {
      const updatedVideo = await videoSchema.findByIdAndUpdate(
        id, // todo: use req.user.id
        {
          $set: req.body
        }, {
        new: true
      })

      res.status(200).json(updatedVideo)
    }
    else {
      next(createError(403, 'You can only edit a video related to your account'))
    }
  }
  catch(e) {
    next(e)
  }
}

// increase likes

export const increLikes = async (req, res, next)=> {
  try {
    const {
      id
    } = req.params

  
    const likeCount= await videoSchema.findByIdAndUpdate(id, {
      $inc: {
        likesCount: 1
      }
    }, {
      new: true
    })

    const liked = await videoSchema.findByIdAndUpdate(id, {
      $push: {
        likes: id
      }
    }, {
      new: true
    })

    res.status(200).json(likeCount)
  }
  catch(e) {
    next(e)
  }
}

//decrease likes


export const decreLikes = async (req, res, next)=> {
  try {
    const {
      id
    } = req.params

    const unliked = await videoSchema.findByIdAndUpdate(id, {
      $inc: {
        likesCount: -1
      }
    }, {
      new: true
    })

 await videoSchema.findByIdAndUpdate(id, {
      $pull: {
        likes: id
      }
    }, {
      new: true
    })

    res.status(200).json(unliked)
  }
  catch(e) {
    next(e)
  }
}

//increase views

export const increViews = async(req, res, next) => {
  try {
    const {
      id
    } = req.params

    const video = await videoSchema.findByIdAndUpdate(id, {
      $inc: {
        views: 1
      }
    }, {
      new: true
    })

    res.status(200).json(video)
  }
  catch(e) {
    next(e)
  }
}

//random video

export const randomVideos = async(req, res, next)=> {
  try {
    const videos = await videoSchema.aggregate([{
      $sample: {
        size: 30
      }
    }])

    if (!videos) return next(createError(404, "Upload a video to view contents"))

    res.status(200).json(videos)
  }
  catch(e) {
    next(e)
  }
}

//trending video

export const trendingVideos = async(req, res, next)=> {
  try {
    const videos = await videoSchema.find().sort({
      views: -1
    })

    if (!videos) return next(createError(404, "Upload a video to view contents"))

    res.status(200).json(videos)
  }
  catch(e) {
    next(e)
  }
}

//subscribers videos

export const subVideos = async(req, res, next)=> {
  try {

    const {id} = req.query

    const user = await userSchema.findById(id) 

    const subscribedChannels = user.subscribedUsers

    if (subscribedChannels.length === 0) return next(createError(404, 'No subscribed users'))
    
    const list = await Promise.all(
      subscribedChannels.map(channelId => {
        return videoSchema.find({
          userId: channelId
        })
      })
    )

    res.status(200).json(list)
  }
  catch(e) {
    next(e)
  }
}

// recommended videos

export const recommendVideos = async (req, res, next) => {
  try {
    const {
      id
    } = req.params

    const currVideo = await videoSchema.findById(id)

    const video = await videoSchema.find({
      tags: {
        $in:
        currVideo.tags
      }
    }).limit(20)

    res.status(200).json(video)
  }
  catch(e) {
    next(e)
  }
}

// search videos

export const searchVideos = async (req, res, next) => {
  try {
    const {
      q
    } = req.query
    
    const videos = await videoSchema.find({
      title: {
        $regex: q,
        $options: "i"
      }}).limit(40)

    if (videos.length === 0) return next(createError(404, "video not found"))

    res.status(200).json(videos)

  }
  catch(e) {
    next(e)
  }
}

// get video by tags


export const tagVideos = async (req, res, next) => {
  try {
    const {
      tag
    } = req.params


    const videos = await videoSchema.find({
      tags: {
        $in: tag
      }})

    if (videos.length === 0) return next(createError(404, "video not found"))

    res.status(200).json(videos)

  }
  catch(e) {
    next(e)
  }
}
