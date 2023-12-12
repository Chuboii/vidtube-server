import express from 'express'
import {verifyToken} from '../verifyToken.js'
import { getNotification, postNotification } from '../controllers/notify.js'

const router = express.Router()

router.get("/notification", getNotification)

router.post("/notification", postNotification)

export default router