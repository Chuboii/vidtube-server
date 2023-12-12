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

router.put("/user/update/:id", verifyToken, updateUser)

router.delete("/user/delete/:id", verifyToken, deleteUser)

router.put("/user/incresub/:id", verifyToken, increSub)

router.put("/user/decresub/:id", verifyToken, decreSub)

export default router