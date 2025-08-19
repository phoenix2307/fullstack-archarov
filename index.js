import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello Lex and Nika!');
})

app.listen(4444, (err)=>{
    if (err) {
        return console.log(err);
    }
    console.log('Server started on port:4444');
});