import express from 'express';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello Lex and Nika!');
})
app.post('/auth/login', (req, res) => {

    const token = jwt.sign(
        {
            email: req.body.email,
            fullName: 'Lex UA'
        }, 'secret2307',
    )

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
