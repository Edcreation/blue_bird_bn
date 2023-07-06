import express from "express";
import { updateProfile, uploadProfilePic, getProfileData } from '../controllers/profile';
import errorHandler from "../middleware/errorHandler";
import upload from "../utils/multer";
import isLoggedIn from "../middleware/isLoggedIn";

const router = express.Router();

router.patch('/',isLoggedIn, errorHandler(updateProfile))
router.get('/', isLoggedIn, errorHandler(getProfileData))
router.patch('/image',isLoggedIn,  upload.single('image'), errorHandler(uploadProfilePic))

export default router;