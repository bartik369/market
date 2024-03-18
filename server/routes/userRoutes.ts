import { IUserDecoded } from './../types/types';
import express, {Request, Response} from 'express';
import User from '../models/user/User';
import Token from '../models/user/Token';
import Password from '../models/user/Password';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/auth/', async(req: Request, res:Response) => {
    try {
        const {email, password} = req.body;
        console.log('auth')
        const user = await User.findOne({email: email});

        if (!user) {
            return res.status(400).json({message: 'Проверьте, пожалуйста, указанные Вами данные.'})
        }
        const candidat = await Password.findOne({userId: user._id});
        const comparePassword = await bcrypt.compare(password, candidat.password);

        if (!comparePassword) {
            return res.status(400).json({message: 'Проверьте, пожалуйста, указанные Вами данные.'})
        }
        const accessToken = jwt.sign(
            {
                _id: user._id,
                email: user.email,
                roles: user.roles,
                member: user.member,
            },  
            process.env.JWT_ACCESS_SECRET,
            {expiresIn: '30m'}
        );
        const refreshToken = jwt.sign(
            {
                _id: user._id,
                email: user.email,
                roles: user.roles,
                member: user.member,
            }, 
            process.env.JWT_REFRESH_SECRET,
            {expiresIn: '18d'}
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
            // maxAge: 18 * 24 * 60 * 60 * 1000 
        });
        res.cookie('accessToken', accessToken, {
            // maxAge: 1* 15 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });
        return res.json({token: accessToken, user: user})
    } catch (error) {
        
    }
});

router.post('/create-user/', async(req: Request, res:Response) => {
    try {
        console.log('reg')
        const {email, password} = req.body;
        const dublicate = await User.findOne({email: email});

        if (dublicate) {
            return res.status(400).json({message: 'Проверьте, пожалуйста, указанные Вами данные.'})
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

router.get('/verify-token/', async(req: Request, res: Response) => {
    try {
        const accessToken = req.cookies.accessToken;
        jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET, (err: any, decoded: IUserDecoded) => {
            
            if (err) {
                return res.status(403).json({message: 'В доступе отказано'})
            } else {
                return res.json({token: accessToken, user: decoded})
            }
        });

    } catch (error) {
        
    }
})

router.get('/refresh-token/', async(req: Request, res:Response) => {
    try {
        const token = req.cookies.refreshToken;
        const decocedInfo = {}

        if (!token) return res.status(401).json({message: 'net avtorizacii'});
        jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err: any, decoded: IUserDecoded) => {
            
            if (err) {
                return res.status(401).json({message: 'net avtorizacii'})
            } else {
                Object.assign(decocedInfo, decoded)
            }
        });
        const user = await User.findById(decocedInfo['_id']);

        if (!user) return res.status(401).json({message: 'net avtorizacii'});
        const accessToken = jwt.sign(
            {
                _id: user._id,
                email: user.email,
                roles: user.roles,
                member: user.member,
            }, 
            process.env.JWT_ACCESS_SECRET,
            {expiresIn: '30m'}
        );
        const refreshToken = jwt.sign(
            {
                _id: user._id,
                email: user.email,
                roles: user.roles,
                member: user.member,
            }, 
            process.env.JWT_REFRESH_SECRET,
            {expiresIn: '18d'}
        );
    
        const existToken = await Token.findOne({user: user._id});

        if (existToken) {
            const updateTokenData = await Token.findOneAndUpdate({_id: existToken._id}, {
                refreshToken: refreshToken
            })
            await updateTokenData.save()
        } else {
            const tokenData = await Token.create({
                user: user._id,
                refreshToken: refreshToken,
            });
            await tokenData.save()
        }

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true, 
            sameSite: 'none',
            secure: true, 
            // maxAge: 18 * 24 * 60 * 60 * 1000 
        });
        res.cookie('accessToken', accessToken, {
            // maxAge: 1 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });
        return res.json({token: accessToken, user: user})
    } catch (error) {
        
    }
});


router.post('/logout/', async(req: Request, res: Response) => {
    try {
        const {cookie} = req.headers;
        const refreshToken = cookie.split("refreshToken=")[1].split(";")[0];
        const tokenData = await Token.deleteOne({refreshToken: refreshToken })
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        return res.status(200).json({ message: "Logout success" })
    } catch (error) {
        
    }
})


export default router;