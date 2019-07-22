const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const User = require('./models/user.js');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect(`mongodb://user:password1@ds139801.mlab.com:39801/demodemo`, {useNewUrlParser: true})

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/singup', (req, res) => {
    res.redirect('/signup');
})

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', (req, res) => {
    console.log(req.body);

    const {name, email, password} = req.body;
    
    User.create({
        name,
        email,
        password
    }, (err, user) =>{
        if(err) console.log(err);
    });

    res.send('okay');
});

app.get('/user/:id/:day', (req, res) => {
    res.send(req.params.id);
    console.log(req.params.day);
})


app.get('*', (req, res) => {
    res.redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on ${process.env.PORT || 3000}`);
})