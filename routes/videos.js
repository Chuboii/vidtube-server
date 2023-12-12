import express from "express"
import {
  addVideo,
  getVideo,
  getChannelVideo,
  deleteVideo,
  editVideo,
  increLikes,
  decreLikes,
  increViews,
  randomVideos,
  trendingVideos,
  subVideos,
  recommendVideos,
  searchVideos,
  tagVideos
} from "../controllers/video.js"
import { verifyToken } from "../verifyToken.js"

const router = express.Router()

router.get("/video/find/:id", getVideo)

router.get("/video/channel", getChannelVideo)

router.post("/video", addVideo)

router.delete("/video/delete/:id", deleteVideo)

router.put("/video/edit/:id", editVideo)

router.put("/video/like/:id", increLikes)

router.put("/video/delike/:id", decreLikes)

router.put("/video/views/:id", increViews)

router.get("/video/random", randomVideos)

router.get("/video/trending", trendingVideos)

router.get("/video/subvideo", subVideos)

router.get("/video/:id/recommendation", recommendVideos)

router.get("/video/search", searchVideos)

router.get("/video/category/:tag", tagVideos)

export default router