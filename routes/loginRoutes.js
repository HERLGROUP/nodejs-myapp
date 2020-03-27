const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/userModel');
const path = require('path');
const permissions = require('../permissions')

// Enpoint for the login page
router.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, '../views', 'loginform.html'));    
})

// Endpoint:- authenticate a user
router.post('/',
    passport.authenticate('local', {failureRedirect: '/login'}),(req, res)=>{
      req.session.user = req.user;
      const role = permissions[req.user.role]
      res.redirect(role.homepage + "?userid="+ req.user.id);
    }
);

// Add another endpoint of 'capture' to serve a form through it
router.get('/capture', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'captureform.html'));    
})

// Export router to be accessible in the main Application 
module.exports = router;