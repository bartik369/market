import { IUserDecoded } from './../types/types';
import express, {Request, Response} from 'express';
import User from '../models/user/User';
import Movie from '../models/media/movie';

const router = express.Router();


router.get('/users/', async(req: Request, res: Response) => {
    try {
        const usersData = await User.find({})
        if (usersData) {
            return res.json(usersData)
        }
    } catch (error) {
        
    }
})

router.get('/movies-count/', async(req: Request, res: Response) => {
    try {
        const moviesData = await Movie.find({})
        if (moviesData) {
            return res.json(moviesData.length)
        }
    } catch (error) {
        
    }
})


export default router;