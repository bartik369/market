import { Request, Response } from "express";
import Actor from "../models/media/actor";

class ActorController {

    async addActor(req: Request, res: Response) {
        try {
            const {name, surname, picture, link} = req.body;
            console.log(req.file)
            console.log(req.body)
            // const actorData = new Actor({
            //     name: name,
            //     surname: surname,
            //     picture: picture,
            //     link: link
            // })
            // await actorData.save()
            // return actorData
        } catch (error) {
            
        }
    }
}

export default new ActorController()