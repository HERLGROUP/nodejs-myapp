const express = require('express')
const router = express.Router();
const User = require('../models/userModel');

router.get('/customerhome',async (req, res) => {
    if (req.session.user) {
        try {
            const userItem = await User.findById(req.session.user._id)
            res.render('customerhome', { user: userItem })
        } catch {
            res.status(500).send("unable to find item in the database");
        }
    } else {
        res.redirect ('/login')
    }
 })

router.get('/adminhome',async (req, res)=>{
    if (req.session.user) {
        res.render('adminhome', {name: req.session.user.fullName});
    } else {
        res.redirect('/login')
    }
});

router.get('/userlist', async (req, res) => {
    if (req.session.user) {
        try {
            let items = await User.find()
            if (req.query.gender) {
                items = await User.find({gender: req.query.gender})
            }
            res.render('list', { users: items })
        } catch {
            res.status(400).send("unable to find items in the database");
        }
    } else {
        res.redirect('/login');
    }
 });
 
 module.exports = router;
 