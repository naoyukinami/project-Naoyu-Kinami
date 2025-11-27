import express from 'express';
const router = express.Router();

import constructionRouter from './constructionRouter.js';
import neighbourhoodRouter from './neighbourhoodRouter.js';
import userRouter from './userRouter.js';
import favRouter from './favRouter.js';

router.use('/construction', constructionRouter);
router.use('/neighbourhood', neighbourhoodRouter);
router.use('/users', userRouter);
router.use('/favorite', favRouter);

// console.log("testtest");

export default router;