import commentSchema from "../models/Comment.js"
import {
  createError
} from "../error.js"

// add comments

export const addComments = async (req, res, next) => {
  try {
    const {
      id
    } = req.params

    const newComment = new commentSchema({
      userId: req.session.user._id,
      videoId: id,
      photoURL: req.session.user.img,
      name: req.session.user.name,
      ...req.body
    })

    await newComment.save()

    res.status(201).json(newComment)

  }
  catch(e) {
    next(e)
  }
}

// get comments

export const getComments = async (req, res, next) => {
  try {
    const {
      id
    } = req.params

    const comments = await commentSchema.find({videoId: id}).sort({createdAt: -1})


    if (!comments) return next(createError(404, "comments not found"))

    res.status(200).json(comments)
  }
  catch(e) {
    next(e)
  }
}

//delete commments

export const deleteComments = async(req, res, next) => {
  try {
    const {
      id
    } = req.params

    if (id === req.user.id) {

      const comment = await commentSchema.findByIdAndDelete(id)

      res.status(200).json("Your video have been deleted successfully")
    }
    else {
      next(createError(403, 'You can only delete your comment when you are logged in'))
    }
  }
  catch(e) {
    next(e)
  }
}

//edit comment

export const editComments = async(req, res, next) => {
  try {
    const {
      id
    } = req.params

    if (id === req.session.user._id) {

      const comment = await commentSchema.findByIdAndUpdate(id, {
        $set: req.body
      }, {
        new: true
      })

      res.status(200).json(comment)
    }
    else {
      next(createError(403, 'You can only edit your own comment'))
    }
  }
  catch(e) {
    next(e)
  }
}

export const previewComment = async (req, res, next) => {
  try {
    const { id } = req.params
    
    const findComment = await commentSchema.find({ videoId: id }).sort({
      createdAt: -1
    }).limit(1)
    
    if (!findComment) return next(createError(404, "Comment not found"))
    
    res.status(200).json(findComment)
  }
  catch (e) {
    next(createError(e))
  }
}