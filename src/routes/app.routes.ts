import { Router } from "express";
import { signupController } from '../controllers/signup.controller';
import { loginController } from '../controllers/login.controller';
import { contactsController } from '../controllers/contacts.controller';
import { verifyToken } from '../middlewares/authToken'
const router = Router();

router.post('/signup', signupController);
router.post('/login', loginController);
router.get('/contacts', verifyToken, contactsController);

export default router;