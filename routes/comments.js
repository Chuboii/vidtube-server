import express from "express"
import {
  addComments,
  getComments,
  editComments,
  deleteComments,
  previewComment
} from "../controllers/comment.js"


const router = express.Router()

router.post("/comment/:id/new", addComments)

router.get("/comment/find/:id", getComments)

router.put("/comment/edit/:id", editComments)

router.delete("/comment/delete/:id", deleteComments)

router.get("/comment/previewcomment/:id", previewComment)

export default router