import jwt from 'jsonwebtoken';
import { createError } from './error.js';
import UserSchema from './models/User.js'

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.access_token

        if(!token) return next(createError(401, 'User is not authenticated'))
        
        jwt.verify(token, process.env.JWT, (err, user) => {
            if (err) return next(createError(403, "Invalid token"))
    
            req.user = user

            next()
        })
    }
    catch (e) { 
        next(e)
    }

};
