
import express from 'express';
import actorController from '../controllers/actorController';
import multer from 'multer';
import path from 'path';
const router = express.Router();
// const uploadActor = multer({ dest: 'uploads/actors' })
// router.use(bodyParser.text())

const actorPortrait = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/actors/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
  
  const upload = multer({ storage: actorPortrait })

router.post('/add-actor/', multer({ storage: actorPortrait }).single('file'), actorController.addActor);
router.get('/actors/', actorController.getActors)

export default router;