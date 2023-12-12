import express from "express"
import {
  addComments,
  getComments,
  editComments,
  deleteComments,
  previewComment
} from "../controllers/comment.js"
import { verifyToken } from "../verifyToken.js"

const router = express.Router()

router.post("/comment/:id/new", verifyToken, addComments)

router.get("/comment/find/:id", getComments)

router.put("/comment/edit/:id", verifyToken, editComments)

router.delete("/comment/delete/:id", verifyToken, deleteComments)

router.get("/comment/previewcomment/:id", previewComment)

export default router