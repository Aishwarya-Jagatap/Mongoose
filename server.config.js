var express=require('express');
var body_parser=require('body-parser');
var mongoose=require('./mongoose.config');

var passport = require("passport")
var LocalStrategy = require("passport-local");
var User = require('../students/models/models.users');

require('dotenv').config();
var app=express();
app.use(body_parser.urlencoded({
    extended: true
}));
app.use(body_parser.json()); 

var db=new mongoose();
app.set('view engine','ejs');
app.use(require("express-session")({
    secret: "MySecret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
var express_port=process.env.PORT || 3000;
app.listen(express_port);
console.log('Server started!');
module.exports=app;
