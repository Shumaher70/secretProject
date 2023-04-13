//jshint esversion:6
require('dotenv').config('')
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10 ;


const app = express();


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
mongoose.connect('mongodb://127.0.0.1:27017/userDB');

const userSchema = new mongoose.Schema({
    email: String,
    password: String
})


const User = new mongoose.model("User", userSchema)


app.get('/', (req,res)=>{
    res.render('home')
});

app.get('/login', (req,res)=>{
    res.render('login')
});

app.get('/register', (req,res)=>{
    res.render('register')
});

app.post('/register',(req,res)=>{
    
    bcrypt.hash(req.body.password, saltRounds)
    .then(hash=>{
        const newUser = new User({
            email: req.body.username,
            password: hash
        });
        newUser.save()
        .then(res.render('secrets'))
        .catch('sometghing wrong, file is not saved')
    })
    .catch('something wrong')
});

app.post('/login', (req,res)=>{
    
    const username = req.body.username
    const password = req.body.password

    User.findOne({email: username})
    .then(foundUser=>{
        bcrypt.compare(password, foundUser.password).then(result =>{
            if(result){
                res.render('secrets')
            } else{
                res.send('your email does not exist or the password is incorrect.')
            }
        })
    })
})


app.listen(3000,()=>{
console.log('localhost 3000 started');
})