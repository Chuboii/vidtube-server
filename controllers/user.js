import mongoose from "mongoose"
import userSchema from "../models/User.js"
import {
  createError
} from '../error.js'

//Get User

export const getUser = async (req, res, next)=> {
  try {
    const {
      id
    } = req.params

    const user = await userSchema.findById(id)

    res.status(200).json(user)

  }
  catch(e) {
    next(e)
  }
}


// Get Users

export const getUsers = async (req, res, next) => {

  try {
    const {
      name
    } = req.query


    const user = await userSchema.find({
      name: "onyechere"
    })

    if (user.length === 0) return next(createError(404, "User not found"))

    res.status(200).json(user)
  }
  catch(e) {
    next(e)
  }
}

//Uodate User

export const updateUser = async(req, res, next)=> {
  try {
    const {
      id
    } = req.params



    if (id === req.session.user._id) {

      const user = await userSchema.findByIdAndUpdate(
        id,
        {
          $set: req.body
        },
        {
          new: true
        }
      )

      res.status(200).json(user)
    }
    else {
      next(createError(403, 'You can update only your account'))
    }
  }
  catch(e) {
    next(e)
  }
}

//Delete user

export const deleteUser = async(req, res, next)=> {
  try {
    const {
      id
    } = req.params
    
    if (id === req.session.user._id) {
      const user = await userSchema.findByIdAndDelete(id) // todo: use req.user.id

      res.status(200).json({
        success: true,
        message: "User have been deleted successfully"
      })
    }
    else {
      next(createError(403, 'You can delete only your account'))
    }
  }
  catch(e) {
    next(e)
  }
}

//incre subscribers

export const increSub = async (req, res, next) => {
  try {
    const {
      id
    } = req.params

    const { userId } = req.body
    
  
    try {
     
      await userSchema.findByIdAndUpdate(
        userId,
        {
          $push: {
            subscribedUsers: id
          }
        }, {new:true})

    
      const subscribers = await userSchema.findByIdAndUpdate(
        id, 
        {
          $inc: {
            subscribers: 1
          }
        },
        {
          new: true
        }
      )

      res.status(200).json(subscribers)
    } catch (e) {
      next(createError(e))
    }
  }
  catch(e) {
    next(e)
  }

}

//decre subscribers

export const decreSub = async (req, res, next) => {
  try {
    const {
      id
    } = req.params

    const {userId} = req.body

    // console.log(id)
    await userSchema.findByIdAndUpdate(userId, {
      $pull: {
        subscribedUsers:id
      }
    }
    )


   const unSub = await userSchema.findByIdAndUpdate(id, {
      $inc: {
        subscribers: -1
      }
    },
      {
        new: true

      })

    res.status(200).json(unSub)
  }
  catch(e) {
    next(e)
  }

}