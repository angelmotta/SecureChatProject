import { Router } from "express";
import { signupController } from '../controllers/signup.controller';
import { loginController } from '../controllers/login.controller';
const router = Router();

router.post('/signup', signupController);
router.post('/login', loginController);

export default router;