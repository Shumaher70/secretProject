//jshint esversion:6
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');

const app = express()

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
mongoose.connect('mongodb://127.0.0.1:27017/userDB');

const userSchema = new mongoose.Schema({
    email: String,
    password: String
})

const secret = 'Thisisourlittlesecret.' 
userSchema.plugin(encrypt, { secret: secret, encryptedFields: ['password'] });


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
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    });
    newUser.save()
    .then(res.render('secrets'))
    .catch('sometghing wrong, file is not saved')
});

app.post('/login', (req,res)=>{
    const username = req.body.username
    const password = req.body.password

    User.findOne({email: username})
    .then(foundUser=>{
        if(foundUser.email == username && foundUser.password == password){
            res.render('secrets')
        } else{
            res.send('your email does not exist or the password is incorrect.')
        }
    })
})


app.listen(3000,()=>{
console.log('localhost 3000 started');
})