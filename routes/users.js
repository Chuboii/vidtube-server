import express from "express"
import {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  increSub,
  decreSub
} from "../controllers/user.js"
import { verifyToken } from "../verifyToken.js"

const router = express.Router()

router.get("/user/find/:id", getUser)

router.get("/user/find", getUsers)

router.put("/user/update/:id", updateUser)

router.delete("/user/delete/:id", deleteUser)

router.put("/user/incresub/:id", increSub)

router.put("/user/decresub/:id", decreSub)

export default router