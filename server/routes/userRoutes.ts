import express, {Request, Response} from 'express';
import User from '../models/user/User';
import Token from '../models/user/Token';
import Password from '../models/user/Password';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from 'process';

const router = express.Router();

router.post('/auth/', async(req: Request, res:Response) => {
    try {
        const {email, password} = req.body;
        console.log(req.body)
        const user = await User.findOne({email: email});

        if (!user) {
            return res.status(400).json({message: 'Проверьте, пожалуйста, указанные данные'})
        }
        const candidat = await Password.findOne({userId: user._id});
        const comparePassword = await bcrypt.compare(password, candidat.password);

        if (!comparePassword) {
            return res.status(400).json({message: 'Проверьте пароль'})
        }
        const accessToken = jwt.sign(
            {'username': user.email}, 
            process.env.JWT_ACCESS_SECRET,
            {expiresIn: '30s'}
        );
        const refreshToken = jwt.sign(
            {'username': user.email}, 
            process.env.JWT_REFRESH_SECRET,
            {expiresIn: '1d'}
        );
        const token = await Token.findOne({user: user._id});

        if (token) {
            token.refreshToken = refreshToken
        }
        const tokenData = await Token.create({
            user: user._id,
            refreshToken: refreshToken,
        });
        await tokenData.save()
        
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true, 
            sameSite: 'none',
            secure: true, 
            maxAge: 24 * 60 * 60 * 1000 
        });
        return res.json({token: accessToken, user: user})
    } catch (error) {
        
    }
});

// router.post('/refresh/', async(req: Request, res:Response) => {
//     try {
//         const cookies = req.cookies;
//         if (cookies?.jwt) return res.status(401)
//         const user = await User.findOne({email: email});

//         if (!user) {
//             return res.status(400).json({message: 'Проверьте, пожалуйста, указанные данные'})
//         }
//         const candidat = await Password.findOne({userId: user._id});
//         const comparePassword = bcrypt.compare(password, candidat.password);

//         if (!comparePassword) {
//             return res.status(400).json({message: 'Проверьте пароль'})
//         }
//         const accessToken = jwt.sign(
//             {'username': user.email}, 
//             process.env.JWT_ACCESS_SECRET,
//             {expiresIn: '30s'}
//         );
//         const refrefhToken = jwt.sign(
//             {'username': user.email}, 
//             process.env.JWT_REFRESH_SECRET,
//             {expiresIn: '1d'}
//         );
//     } catch (error) {
        
//     }
// });

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