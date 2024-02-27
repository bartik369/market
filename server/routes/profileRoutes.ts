import express, {Request, Response} from 'express';
import User from '../models/user/User';

const router = express.Router();

router.get('/profile/:id', async(req: Request, res:Response) => {
    try {
        const {id} = req.params;
        console.log('id', id)
        const user = await User.findById(id);
        
        if (user) {
            return res.json(user)
        }
        
    } catch (error) {
        
    }
});

export default router;