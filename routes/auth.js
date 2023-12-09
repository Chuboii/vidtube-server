import express from "express"
import {
  signup,
  signin,
  googleAuth,
  logout
} from "../controllers/auth.js"

const router = express.Router()

router.post("/auth/signup", signup)
  
router.post("/auth/signin", signin)

router.post("/auth/google", googleAuth)
  
router.post("/auth/logout", logout)
  export default router