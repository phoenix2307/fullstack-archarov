import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://phoenix2307:pallada12@cluster0.ct1k0py.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));


const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello Lex and Nika!');
})
app.post('/auth/login', (req, res) => {

    if (req.body.email === 'phoenix@gu.com') {
        const token = jwt.sign(
            {
                email: req.body.email,
                fullName: 'Lex UA'
            }, 'secret2307',
        )
    }

    console.log(req.body);
    res.json({
        success: true,
        token,
    })
})

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server started on port:4444');
});
