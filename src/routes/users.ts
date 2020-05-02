import express from 'express';
import { allUsers, addUser } from '../controllers/userController';

const router = express.Router();

router.route('/').get(allUsers).post(addUser);

export default router;
