import { IUserDecoded } from './../types/types';
import express, {Request, Response} from 'express';
import multer from 'multer';
import User from '../models/user/User';
import Movie from '../models/media/movie';
import Slider from '../models/media/slider';

const router = express.Router();
const movieSlider = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/slider/main/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
});


router.get('/users/', async(req: Request, res: Response) => {
    try {
        const usersData = await User.find({})
        if (usersData) {
            return res.json(usersData)
        }
    } catch (error) {
        
    }
});

router.get('/movies-count/', async(req: Request, res: Response) => {
    try {
        const moviesData = await Movie.find({})
        if (moviesData) {
            return res.json(moviesData.length)
        }
    } catch (error) {
        
    }
});

router.post('/add-slide/', multer({ storage: movieSlider }).single('file'),
async(req: Request, res: Response) => {
    try {
        const {movieTitle, description} = req.body;
        console.log(description)
        const movie = await Movie.findOne({titleRu: movieTitle});
        const slideData = new Slider({
            movieId: movie._id,
            movieLink: movie._id,
            media: req.file.originalname,
            description: description 
        })
        await slideData.save()
        return slideData
    } catch (error) {
        
    }
})
router.get('/get-slides', async(req:Request, res: Response) => {
    try {
        const dataSlides = await Slider.find({});
        if (dataSlides) {
            return res.json(dataSlides)
        }
    } catch (error) {
        
    }
})



export default router;