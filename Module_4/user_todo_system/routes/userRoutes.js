import express from 'express';
import { signup, deleteUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/signup' , signup);
router.delete('/delete-user/:userId', deleteUser);

export default router;
