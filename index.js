import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import {validationResult} from 'express-validator'
import {registerValidation} from './validations/auth.js'
import UserModel from './models/User.js'

mongoose.connect('mongodb+srv://phoenix2307:pallada12@cluster0.ct1k0py.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app = express();
app.use(express.json());

app.post('/auth/login', async (req, res) => {
    try {

        const user = await UserModel.findOne({email: req.body.email})
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)
        if (!isValidPass) {
            return res.status(400).json({
                message: 'User or password is incorrect'
            })
        }

        const token = jwt.sign({
            _id: user._id
        }, 'secret123', {expiresIn: '24h'})

        const {passwordHash, ...userData} = user._doc
        res.json({
            ...userData,
            token: token,
        })
    }
    catch (error) {
        console.log(err)
        res
            .status(500)
            .json({errorMessage: 'Не вдалося авторизуватися'});
    }
})

app.post('/auth/register', registerValidation, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10)
        const passwordHashed = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            fullName: req.body.fullName,
            email: req.body.email,
            avatarUrl: req.body.avatarUrl,
            passwordHash: passwordHashed,
        })

        const user = await doc.save()

        const token = jwt.sign({
            _id: user._id,
        }, 'secret123', {expiresIn: '24h'})

        const {passwordHash, ...userData} = user._doc
        res.json({
            ...userData,
            token: token,
        })
    } catch (err) {
        console.log(err)
        res
            .status(500)
            .json({errorMessage: 'Не вдалося зареєструватися'});
    }
})

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server started on port:4444');
});
