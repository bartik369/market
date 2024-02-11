import express from 'express';
import {Request, Response} from 'express';
import ActorModel from '../models/media/actor';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const extLink = uuidv4()
const actorPortrait = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/actors/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + extLink + path.extname(file.originalname))
    }
})

  router.get('/actors/',
  async(req: Request, res:Response) => {
    try {
      const actorData = await ActorModel.find({})

      if (actorData) {
           console.log(actorData)
          return res.json(actorData)
      }
    } catch (error) {
      
    }
  }
  )
  router.post('/add-actor/', multer({ storage: actorPortrait }).single('file'),
   async (req: Request, res:Response) => {
     try {
       console.log(req.body)
       console.log(req.file)
      const {name_en, name_ru, link} = req.body;
      const actorData = new ActorModel({
          name_en: name_en,
          name_ru: name_ru,
          picture: req.file.fieldname + '-' + extLink + path.extname(req.file.originalname),
          link: link
      })
      await actorData.save()
     } catch (error) {
       
     }
   }
  )

// router.post('/add-actor/', multer({ storage: actorPortrait }).single('file'), actorController.addActor);
// router.get('/actors/', actorController.getActors)

export default router;