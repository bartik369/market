import express from 'express';
import actorController from '../controllers/actorController';
const router = express.Router();

router.post('/add-actor/', actorController.addActor);

export default router;