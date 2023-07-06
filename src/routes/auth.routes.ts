import express from "express";
import authController from '../controllers/auth';
import { validate } from "../middleware/validate";
import userSchema from "../schema/validation.schema"
import errorHandler from "../middleware/errorHandler";

const router = express.Router();

router.post('/signup', validate(userSchema.SignUpSchema), errorHandler(authController.SignUp))
router.post('/login', validate(userSchema.LoginSchema), errorHandler(authController.Login))

export default router;