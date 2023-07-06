import { RESPONSE } from "../../types"
import Profile from "../db/models/profile.model"
import Text from "../db/models/texts.model"

export const addText = (req: any, res: any) => {
    Text.create({
        userId: req.user.id,
        profileId: req.user.id,
        text: req.body.text,
        movieId: req.params.id,
        date: new Date(Date.now()).toDateString(),
    }).then((result) => {
        res.status(200).json({
            code: 200,
            message: 'Text Added',
            data: result
        } as RESPONSE)
    }).catch((error) => {
        console.log(error);
        res.status(400).json({
            code: 400,
            message: 'error',
        } as RESPONSE)
    })

}

export const getTexts = (req: any, res: any) => {
    Text.find().populate('userId', 'username').populate('profileId', 'image').then((result) => {
        res.status(200).json({
            code: 200,
            message: 'Text Fetched',
            data: result
        } as RESPONSE)
    }).catch((error) => {
        console.log(error);
        res.status(400).json({
            code: 400,
            message: 'error',
        } as RESPONSE)
    })
}

export const getUsersTexts = (req: any, res: any) => {
    Text.find({ userId: req.user.id }).populate('userId', 'username').populate('profileId', 'image').then((result) => {
        res.status(200).json({
            code: 200,
            message: 'Text Fetched',
            data: result.reverse()
        } as RESPONSE)
    }).catch((error) => {
        console.log(error);
        res.status(400).json({
            code: 400,
            message: 'error',
        } as RESPONSE)
    })
}