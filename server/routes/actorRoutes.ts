import bodyParser from 'body-parser';
import express from 'express';
import actorController from '../controllers/actorController';
const router = express.Router();
router.use(bodyParser.text())

router.post('/add-actor/', actorController.addActor);

export default router;