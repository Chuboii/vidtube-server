import jwt from 'jsonwebtoken';
import { createError } from './error.js';
import UserSchema from './models/User.js'

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.session.user

        if(!token) return next(createError(401, 'User is not authenticated'))
        
        next()
        
    }
    catch (e) { 
        next(e)
    }

};
