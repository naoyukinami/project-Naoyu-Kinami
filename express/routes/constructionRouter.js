import express from 'express';
const constructionRouter = express.Router();

import { getConstructions, getOneConstruction, updateProject } from './../contorollers/constructionContorollers.js';
// import { getNeighbourhoods } from '../contorollers/neighbourhoodContorollers.js';

constructionRouter.get('/', getConstructions);
constructionRouter.get('/:id', getOneConstruction);
// constructionRouter.post('/', postProject);
constructionRouter.patch("/:id", updateProject);


export default constructionRouter;