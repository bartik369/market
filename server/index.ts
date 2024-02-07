import express, { Express, Request, Response } from "express";
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import actorRoutes from './routes/actorRoutes'
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
app.use('/api', actorRoutes)

server.listen(PORT, () => {
    console.log(`Server ready on port ${PORT}`)
})

const start = async() => {
    try {
        await mongoose.connect('mongodb+srv://bartik369:7DRf9R8HLRD2ro8C@cluster1.tuup8ip.mongodb.net/?retryWrites=true&w=majority');

    } catch (error) {
        console.log(error)
    }
}
start()
