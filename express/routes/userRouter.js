import express from 'express';
import { validateUser } from '../middleware/validator.js';
const userRouter = express.Router();

import { postUser, deleteUser } from '../contorollers/userContorollers.js';

userRouter.post('/', validateUser, postUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;