import express from 'express';
const neighbourhoodRouter = express.Router();

import { getNeighbourhoods, getByNeighbourhood, countConstructionByNeighbourhood } from '../contorollers/neighbourhoodContorollers.js';

//なんでこれが一番上じゃないと動かない？
neighbourhoodRouter.get('/count', countConstructionByNeighbourhood);
neighbourhoodRouter.get('/', getNeighbourhoods);
neighbourhoodRouter.get('/:neighbourhoodName', getByNeighbourhood);

export default neighbourhoodRouter;
