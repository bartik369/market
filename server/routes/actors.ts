import express from 'express';
import actors from '../controllers/actors';
const router = express.Router();

router.post('/add-actor', actors.addActor);

export default router;