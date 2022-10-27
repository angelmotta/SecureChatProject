import { Router } from "express";
import { signupController } from '../controllers/signup.controller';
const router = Router();

router.post('/signup', signupController);

export default router;