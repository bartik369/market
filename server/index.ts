import express, { Express } from "express";
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import actorRoutes from './routes/actorRoutes';
import movieRoutes from './routes/movieRoutes';
import userRoutes from './routes/userRoutes';
import profileRoutes from './routes/profileRoutes';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';



const app: Express = express();
const server = createServer(app)
dotenv.config();
const PORT = process.env.PORT || 5001
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,

}));
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())
app.use('/api', actorRoutes, movieRoutes, userRoutes, profileRoutes)
app.use('/uploads', express.static(__dirname + '/uploads'));

server.listen(PORT, () => {
    console.log(`Server ready on port ${PORT}`)
})

const start = async() => {
    try {
        await mongoose.connect(process.env.DB_URL);

    } catch (error) {
        console.log(error)
    }
}
start()
