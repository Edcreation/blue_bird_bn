import { USER, RESPONSE } from '../../types';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import User from '../db/models/users.model';
import Profile from '../db/models/profile.model';

const { hash, compare } = bcrypt;

const SignUp = async (req: any, res: any) => {
    let userInfo: USER = req.body;
    userInfo.password = await hash(userInfo.password, 10);
    const userExists = await User.findOne({$or: [
        {email: userInfo.email},
        {username: userInfo.username}
    ]});
    if (userExists) {
        return res.status(409).json({
            code: 409,
            message: 'User Already Exists'
        } as RESPONSE)
    }
    await User.create(userInfo).then((data) => {
        const userObj = {
            id: data._id,
            email: data.email,
            username: data.username,
        }
        console.log(userObj)
        Profile.create({ _id: data._id }).then(() => {
            jwt.sign(userObj, 'TOP_SECRET', (err, payload) => {
                if (!err) {
                    return res.status(200).json({
                        code: 200,
                        message: 'Sign Up Successful.',
                        data: payload
                    } as RESPONSE)   
                }
                throw new Error('Error Signing token.')
            })
        }).catch((error) => {
            console.log(error)
            return res.status(400).json({
                code: 400,
                message: 'Sign Up Unsuccessful.',
            } as RESPONSE)  
        })
    })
    .catch((error) => {
        return res.status(400).json({
            code: 400,
            message: 'Account Not Created.',
            error: error.message,
        } as RESPONSE)
    });
}

const Login = async (req: any, res: any) => {
    let userInfo: USER = req.body;
    const user = await User.findOne({email: userInfo.email})
    if (!user) {
        return res.status(401).json({
            code: 401,
            message: 'User Not Found.',
        } as RESPONSE)      
    }
    const validUser = await compare(userInfo.password, user!.password);
    if (validUser) {
        const userObj = {
            id: user!.id,
            email: user!.email,
            username: user!.username
        }
        jwt.sign(userObj, 'TOP_SECRET', (err, payload) => {
            if (!err) {
                return res.status(200).json({
                    code: 200,
                    message: 'Log In Successful.',
                    data: payload
                } as RESPONSE)   
            }
            throw new Error('Error Signing token.')
        })
    }  
    else {
        return res.status(401).json({
            code: 401,
            message: 'Password Incorrect.',
        } as RESPONSE)
    }
}

export default { SignUp, Login }