import express from 'express';
import { validateFavorite } from '../middleware/validator.js';
const favRouter = express.Router();

import getFav from '../contorollers/favContorollers.js';

favRouter.post('/', validateFavorite, getFav);

export default favRouter;