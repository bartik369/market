import express, {Request, Response} from 'express';
import ActorModel from '../models/media/actor';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const actorPortrait = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/actors/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
});

  router.get('/actors/',
  async(req: Request, res:Response) => {
    try {
      const actorData = await ActorModel.find({})

      if (actorData) {
          return res.json(actorData)
      }
    } catch (error) {
      return error
    }
  }
  )

  router.post('/movie_actors/',
  async(req: Request, res:Response) => {
    try {
      const actorsData = await ActorModel.aggregate([{
        $match: { "nameRu": { $in: req.body } }
      }]);
      return res.json(actorsData)

    } catch (error) {
      return error
    }
  }
  )

  router.post('/add-actor/', 
  multer({ storage: actorPortrait }).single('file'),
   async (req: Request, res:Response) => {
     try {
      const {nameEn, nameRu, link, birthday, country, city, height, gender, genre} = req.body;
      const actorData = new ActorModel({
          nameEn: nameEn,
          nameRu: nameRu,
          picture: req.file.originalname,
          extInfo: {
            link: link,
            birthday: birthday,
            country: country,
            city: city,
            height: height,
            gender: gender,
            genre: genre.split(','),
          }
      })
      await actorData.save()
     } catch (error) {
       return error
     }
   }
  )

export default router;