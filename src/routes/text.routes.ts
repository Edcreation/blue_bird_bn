import express from "express";
import errorHandler from "../middleware/errorHandler";
import isLoggedIn from "../middleware/isLoggedIn";
import { addText, getTexts, getUsersTexts } from "../controllers/text";

const router = express.Router();

router.post('/:id',isLoggedIn, errorHandler(addText))
router.get('/all', errorHandler(getTexts));
router.get('/',isLoggedIn, errorHandler(getUsersTexts));

export default router;