import express from "express";
import multer from "multer";
import {
  createEvent,
  getEvents,
  deleteEvent,
  updateEvent,
  singleEvent,
} from "../controllers/eventController.js";

const router = express.Router();

// Multer config for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // uploads folder
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

router.post("/create", upload.single("image"), createEvent);

router.get("/", getEvents);
router.delete("/:id", deleteEvent);
router.put("/:id", updateEvent);
router.get("/:id", singleEvent);

export default router;
