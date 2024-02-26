import express, {Request, Response} from 'express';

const router = express.Router();

router.get('/profile/', async(req: Request, res:Response) => {
    try {
        console.log('rofile works')
        
    } catch (error) {
        
    }
});

export default router;