import express from "express"
const router = express.Router()
import { index , redirectUrl } from "../controllers/url.controller.js"

router.post("/create/shorturl", index)
router.get("/:id", redirectUrl)

export default router