//jshint esversion:6
const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const path = require('path');

const app = express()
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');




app.listen(3000,()=>{
console.log('localhost 3000 started');
})