import express from 'express';
import mongoose from 'mongoose';
import {registerValidation, loginValidation} from './validations.js'
import checkAuth from './utils/checkAuth.js'
import {getMe, login, register} from "./controllers/UserController.js";

mongoose.connect('mongodb+srv://phoenix2307:pallada12@cluster0.ct1k0py.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app = express();
app.use(express.json());

app.post('/auth/register', registerValidation, register)
app.post('/auth/login', loginValidation, login)
app.get('/auth/me', checkAuth, getMe)

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server started on port:4444');
});
