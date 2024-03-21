import { IUserDecoded } from './../types/types';
import express, {Request, Response} from 'express';
import { Buffer } from 'node:buffer';
import multer from 'multer';
import User from '../models/user/User';
import Movie from '../models/media/movie';
import Slider from '../models/media/slider';
import fs from 'fs'

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
        const movie = await Movie.findOne({titleRu: movieTitle});
        const slideData = new Slider({
            movieId: movie.id,
            movieLink: movie.id,
            media: req.file.originalname,
            description: description,
            movieTitle: movieTitle,
        })
        await slideData.save()
        return res.json(slideData)
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
});
router.post('/get-slide/', async(req:Request, res: Response) => {
    try {
        const {id} = req.body;
        const slideData = await Slider.findOne({_id: id});
        fs.readFile(`./uploads/slider/main/${slideData.media}`, (err, data) => {
            let file64:string = data.toString('base64');
            return res.json({slideData, file64})
        });
    } catch (error) {
        
    }
});
router.delete('/delete-slide/', async(req:Request, res: Response) => {
    try {
        const {id} = req.body;
        const existSlide = await Slider.findById(id);
        fs.unlink(`./uploads/slider/main/${existSlide.media}`, (err) => {
            if (err) {
                throw err
            }
        });
        const slideData = await Slider.findByIdAndDelete(id)
        return res.json(slideData)
    } catch (error) {
        
    }
});
router.put('/update-slide/', multer({ storage: movieSlider }).single('file'), 
async(req:Request, res: Response) => {
    try {
        const {_id, movieTitle, media, description } = req.body
        const movie = await Movie.findOne({titleRu: movieTitle});

        if (movie) {
            const slide = await Slider.findById(_id);

            if (slide) {
                if (req.file) {
                    fs.unlink(`./uploads/slider/main/${slide.media}`, (err) => {
                        if (err) { throw err}
                    });
                }
                const updatedSlide = await Slider.findByIdAndUpdate(_id, {
                    movieId: _id,
                    movieLink: movie._id,
                    media: req.file ? req.file.originalname : media,
                    description: description,
                    movieTitle: movieTitle,
                });
                await updatedSlide.save()
                return res.json(updatedSlide)
            }
        }
        
    } catch (error) {
        
    }
});




export default router;