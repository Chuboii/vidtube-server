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
    
    const match = await bcrypt.compare(passkey, user.password);

    if (!match) return next(createError(400, "Invalid credentials"))
  
    const { password, ...others } = user._doc

    req.session.user = user

    res.status(200).json(others)
   

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
    const hash = bcrypt.hashSync(password, salt);
    
    const doesEmailExist = await UserSchema.find({ email })
    

    if(doesEmailExist.length > 0) return res.status(403).json("Email is being used by another user")

    const newUser = new UserSchema({
      name,
      email,
      password: hash,
      username,
      img
    })


    await newUser.save()

    req.session.user = newUser

    res.status(200).json(newUser)
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
    
      req.session.user = user
      res.status(200).json(user)
    
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

      req.session.user = newUser

      res.status(200).json(newUser)
    }
  }
  catch (e) {
    next(e)
  }
}

export const logout = (req, res, next) => {
  req.session.destroy(() => {
    res.status(200).json("logged out");
  });
  
  };
  