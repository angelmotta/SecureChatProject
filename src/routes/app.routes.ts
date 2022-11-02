import { Router } from "express";
import { signupController } from '../controllers/signup.controller';
import { loginController } from '../controllers/login.controller';
import { homeController } from '../controllers/home.controller';
import { addContactController } from '../controllers/contacts.controller';
import { sendMessageController } from '../controllers/message.controller';
import { verifyToken } from '../middlewares/authToken'
const router = Router();

router.post('/signup', signupController);
router.post('/login', loginController);
router.get('/home', verifyToken, homeController);
router.post('/contact', verifyToken, addContactController);
router.post('/message', verifyToken, sendMessageController);

export default router;