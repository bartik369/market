import express, {Request, Response} from 'express';
import Movie from '../models/media/movie';
import Favorite from '../models/media/favotite';
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
        const movieData = await Movie.find({});

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
        const movieData = await Movie.findOne({_id: id});

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
        const movieData = await Movie.find(
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

            const movieData = new Movie({
                titleEn: titleEn,
                titleRu: titleRu,
                picture: req.files[0].originalname,
                trailer: req.files[1]?.originalname || '',
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
        const movieData = await Movie.findById(id);
        
        if (movieData) {
            const ratingData = await Movie.findByIdAndUpdate(id, {
                rating: (value + movieData.rating) / 2
            });
            await ratingData.save()
            return res.json(ratingData)
        }
    } catch (error) {
        
    }
});

router.post('/add-favorite', async(req: Request, res:Response) => {
    try {
        const {userId, movieId} = req.body;
        const existRecord = await Favorite.findOne({userId: userId});
        if (!existRecord) {
            const newRecord = new Favorite({
                userId: userId,
                movies: movieId,
            });
            await newRecord.save()
        } else {
            const existFavotite = await Favorite.findOne({
                movies: { $all: movieId}
            })
            if (existFavotite) {
                return null
            } else {
                const newData = await Favorite.findByIdAndUpdate(existRecord._id, {
                    $push: { movies: movieId},
                })
                await newData.save()
                return res.json(newData)
            }
        }
    } catch (error) {
        
    }
});

router.post('/favorites', async(req: Request, res: Response) => {
    try {
        const {id} = req.body;
        const favoriteData = await Favorite.findOne({userId: id})

        if (favoriteData) {
            return res.json(favoriteData)
        } else {
            return null
        }
    } catch (error) {
        
    }
})

// const enableVisible = await ParticipantsModel.findByIdAndUpdate(
//     participants._id, {
//         $push: { visible: creatorId },
//     }
// );


export default router;