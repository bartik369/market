import bodyParser from 'body-parser';
import express from 'express';
import actorController from '../controllers/actorController';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' })
const router = express.Router();
// router.use(bodyParser.text())

router.post('/add-actor/', upload.single('file'), actorController.addActor);

export default router;