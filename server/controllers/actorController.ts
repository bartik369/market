import { Request, Response } from "express";
import ActorModel from "../models/media/actor";
import path from 'path';

class ActorController {

    async getActors(req:Request, res:Response) {
        try {
            console.log('route get actors')
            const actorData = await ActorModel.find({})

            if (actorData) {
                 console.log(actorData)
                return res.json(actorData)
            }
        } catch (error) {
            
        }
    }

    async addActor(req: Request, res: Response) {
        try {
            const {name_en, name_ru, link} = req.body;
            const actorData = new ActorModel({
                name_en: name_en,
                name_ru: name_ru,
                picture: req.file.fieldname + '-' + Date.now() + path.extname(req.file.originalname),
                link: link
            })
            await actorData.save()
            return actorData
        } catch (error) {
            
        }
    }
}

export default new ActorController()