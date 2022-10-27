import { Router } from "express";
import { signupController } from '../controllers/signup.controller';
const router = Router();

router.get('/signup', signupController);

export default router;