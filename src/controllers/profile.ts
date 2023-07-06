import { RESPONSE } from "../../types"
import Profile from "../db/models/profile.model"
import { uploadImage } from "../utils/cloudinary"

export const updateProfile = (req: any, res: any) => {
    const { id } = req.user
    Profile.findOneAndUpdate({ _id: id }, req.body, {upsert: true}).then((result) => {
        res.status(200).json({
            code: 200,
            message: 'Profile updated',
        } as RESPONSE)
    }).catch(() => {
        res.status(400).json({
            code: 400,
            error: 'Unable to process request.',
        } as RESPONSE)
    })
}

export const uploadProfilePic = async (req: any, res: any) => {
    const path = req.file.path;
    uploadImage(path, 'blue_bird_dps').then((data) => {
        Profile.findOneAndUpdate({ _id: req.user.id }, { image: data.url }, {upsert: true}).then(() => {
            res.status(200).json({
                code: 200,
                message: 'Uploaded',
                data
            } as RESPONSE)
        }).catch((error) => {
            console.log(error);
            res.status(400).json({
                code: 400,
                error: 'Unable to process request.',
            } as RESPONSE)
        })
    }).catch((error) => {
        res.status(400).json({
            code: 400,
            error,
        } as RESPONSE)
    })
}

export const getProfileData = (req: any, res: any) => {
    Profile.findOne({ _id: req.user.id }).then((data) => {
        res.status(200).json({
            code: 200,
            message: 'Profile Image',
            data
        } as RESPONSE)
    })
}