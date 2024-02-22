import express, {Request, Response} from 'express';
import User from '../models/user/User';
import Token from '../models/user/Token';
import Password from '../models/user/Password';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/create-user/', async(req: Request, res:Response) => {
    try {
        const {email, password} = req.body;
        const dublicate = await User.findOne({email: email});

        if (dublicate) {
            return res.status(400).json({message: 'Проверьте, пожалуйста, указанные данные'})
        }
        const hashPassword = await bcrypt.hash(password, 7); 
        const user = new User({
            email: email,
            roles: ['USER'],
            member: ['START'],
        })
        await user.save()

        if (user) {
            await Password.create({
                userId: user._id,
                password: hashPassword,
            });
            return res.status(201).json({message: 'User created'})
        } else {
            return res.status(400).json({message: 'Invalid user data received'})
        }
    } catch (error) {
    }
});

router.post('/user/:id', async(req: Request, res:Response) => {
    try {
        
    } catch (error) {
        
    }
});


export default router;