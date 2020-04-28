const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const registerRoutes = require('./routes/registerRoutes');
const loginRoutes = require('./routes/loginRoutes');
const userRoutes = require('./routes/userRoutes');
const session = require('express-session');
const User = require('./models/userModel');
const passport = require('passport')
const server = express();

// Database Startup: #mongod --config /usr/local/etc/mongod.conf
// mongoose.connect('mongodb://localhost:27017/node-demo', {useNewUrlParser: true, useUnifiedTopology: true}, function (err) {
//    if (err) throw err;
//    console.log('Successfully connected');
// });

let db = 'mongodb+srv://herlgroup:B0raB0ra@cluster0-ki8bs.mongodb.net/test?retryWrites=true&w=majority';
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    console.log("MongoDB is Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
connectDB();



server.set('view engine', 'pug');
server.use(express.static ('public'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(passport.initialize());
server.use(passport.session());
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser)

// Use sessions for tracking logins
server.use(session({
    secret: 'thesecret',
    resave: true,
    saveUninitialized: false
 }));

server.use("/register", registerRoutes);
server.use("/login", loginRoutes);
server.use("/user", userRoutes);

// Logout code :- here so that its on '/' instead but can be anywhere
server.post('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(function (err) {
            if (err) {
            } else {
               return res.redirect('/login');
            }
        })
    }  
})

// Error Handler
server.get ('*', (req, res) => {
    res.send('error');
})

// Listener
server.listen(3000, function() {
    console.log('listening on Port: 3000')
})
