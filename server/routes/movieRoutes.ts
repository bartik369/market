import express, {Request, Response} from 'express';
import MovieModel from '../models/media/movie';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const extLink =  uuidv4();
const moviePoster = multer.diskStorage({
    destination: function(req, res, cb) {
        cb(null, './uploads/movies/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
      }
});

router.get('/movies/',
async(req:Request, res:Response) => {
    try {
        console.log('get movies work')
        const movieData = await MovieModel.find({})

        if (movieData) {
            return res.json(movieData)
        }
    } catch (error) {
        return error
    }
}
)

router.post('/add-movie/', multer({storage: moviePoster}).single('file'),
    async (req: Request, res: Response) => {
        try {
            const {
                titleEn, titleRu, genre, year, country,
                 description, director, ageCategory, time, actors} = req.body;
            const movieData = new MovieModel({
                titleEn: titleEn,
                titleRu: titleRu,
                // picture: req.file.filename + '-' + extLink + path.extname(req.file.originalname),
                picture: req.file.originalname,
                genre: genre.split(','),
                year: year,
                country: country,
                description: description,
                director: director,
                ageCategory: ageCategory,
                time: time,
                actors: actors.split(','),
            })
            await movieData.save();

        } catch (error) {
            return error
        }
    }
)

export default router;