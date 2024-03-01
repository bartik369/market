import express, {Request, Response} from 'express';
import MovieModel from '../models/media/movie';
import multer from 'multer';

const router = express.Router();

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
        const movieData = await MovieModel.find({});

        if (movieData) {
            return res.json(movieData)
        }
    } catch (error) {
        return error
    }
}
)

router.get('/movie/:id',
async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const movieData = await MovieModel.findOne({_id: id});

        if (movieData) {
            return res.json(movieData)
        }
        
    } catch (error) {
        
    }
}
)

router.post('/search-movie/',
async (req: Request, res:Response) => {
    try {
        const {search} = req.body
        const movieData = await MovieModel.find(
            {'titleRu': {$options: 'i', $regex: search}})
        return res.json(movieData)
    } catch (error) {
        
    }
}
)

router.post('/add-movie/', multer({storage: moviePoster}).any(),
    async (req: Request, res: Response) => {
        try {
            const {
                titleEn, titleRu, genre, year, country,
                 description, director, ageCategory, time, actors} = req.body;
            const movieData = new MovieModel({
                titleEn: titleEn,
                titleRu: titleRu,
                picture: req.files[0].originalname,
                trailer: req.files[1].originalname,
                genre: genre.split(','),
                year: year,
                country: country,
                description: description,
                director: director,
                ageCategory: ageCategory,
                time: time,
                rating: 0,
                actors: actors.split(','),
            });
            await movieData.save()

        } catch (error) {
            return error
        }
    }
)
router.post('/set-rating', async(req:Request, res:Response) => {
    try {
        const {value, id} = req.body;
        const movieData = await MovieModel.findById(id);
        
        if (movieData) {
            const ratingData = await MovieModel.findByIdAndUpdate(id, {
                rating: (value + movieData.rating) / 2
            });
            await ratingData.save()
            return res.json(ratingData)
        }
    } catch (error) {
        
    }
});


export default router;