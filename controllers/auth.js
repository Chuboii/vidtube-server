import mongoose from "mongoose"
import UserSchema from "../models/User.js"
import {
  createError
} from "../error.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import randomLetters from 'random-letters'
import session from "express-session"


export const signin = async (req, res, next) => {
  try {
    const { email, passkey } = req.body
  
    const user = await UserSchema.findOne({ email })

    if (!user) return next(createError(404, "User does not have an account"))
    
    const match = bcrypt.compare(passkey, user.password);

    if (!match) return next(createError(400, "Invalid credentials"))
  
    const { password, ...others } = user._doc
    
    const token = jwt.sign({user}, process.env.JWT)
  
    res.cookie("access_token", token).status(200).json(others)


  }
  catch (e) {
    next(e)
  }
}


export const signup = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      username,
      img
    } = req.body

    const saltRounds = 10;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash =  bcrypt.hashSync(password, salt);

    const newUser = new UserSchema({
      name,
      email,
      password: hash,
      username,
      img
    })


    await newUser.save()

    const token = jwt.sign({ user: newUser }, process.env.JWT)
      
     res.cookie("access_token", token).status(200).json(newUser)
    
  }
  
  catch(e) {
    next(e);
  }
}

export const googleAuth = async (req, res, next) => {
  try {
    const { name, email, img } = req.body
    
    const user = await UserSchema.findOne({ email })
    console.log(req.session)
    
    if (user) {
      const token = jwt.sign({ user }, process.env.JWT)

      res.cookie("access_token", token).status(200).json(user)
    }
    else {
    
      const randomUsername = `user${randomLetters(8)}`

   
      const newUser = new UserSchema({
        name,
        email,
        img,
        username:randomUsername,
        fromGoogle:true
      })

      await newUser.save()

      const token = jwt.sign({ user: newUser }, process.env.JWT)
      
      res.cookie("access_token", token, {
        httpOnly: true
      }).status(200).json(newUser)
    }
  }
  catch (e) {
    next(e)
  }
}

export const logout = (req, res, next) => {
     res.clearCookie("access_token").status(200).json('Successfully logged out')
  };
  