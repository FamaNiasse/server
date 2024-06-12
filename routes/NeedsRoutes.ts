import { Router } from 'express';
import NeedsController from '../controller/NeedsController';

const needsRouter = Router();
const needsController = new NeedsController();

needsRouter.get('/', (req, res) => needsController.getAll(req, res));

export default needsRouter;
