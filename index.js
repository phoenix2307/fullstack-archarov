import express from 'express';
import mongoose from 'mongoose';
import {registerValidation, loginValidation, postCreateValidation} from './validations.js'
import checkAuth from './utils/checkAuth.js'
import {getMe, login, register} from "./controllers/UserController.js";
// import {createPost} from "./controllers/PostController.js";
import * as PostController from './controllers/PostController.js'
import multer from "multer";
import handleValidationErrors from "./utils/handleValidationErrors.js";

mongoose.connect('mongodb+srv://phoenix2307:pallada12@cluster0.ct1k0py.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app = express();

const storage = multer.diskStorage({
    //шлях, де будуть зберігатись картинки
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    //фіксація назви файлу
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    }
})

const upload = multer({storage});

app.use(express.json());
app.use('/uploads', express.static('uploads'));


app.post('/auth/register', registerValidation, handleValidationErrors,  register)
app.post('/auth/login', loginValidation, handleValidationErrors, login)
app.get('/auth/me', checkAuth, getMe)
//=========================================
app.post('/upload', checkAuth, upload.single('image'), (req, res)=>{
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})
//=========================================
app.get('/posts', PostController.getAllPosts);
app.get('/posts/:id', PostController.getPostById);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.createPost);
app.delete('/posts/:id', checkAuth, PostController.deletePost);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.updatePost);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server started on port:4444');
});
