import express, {Request, Response} from 'express';
import User from '../models/user/User';
import dotenv from 'dotenv';

const router = express.Router();
dotenv.config();

router.get(`${process.env.API_PROFILE}`, async(req: Request, res:Response) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        
        if (user) {
            return res.json(user)
        }   
    } catch (error) {    
    }
});

export default router;