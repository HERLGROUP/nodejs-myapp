const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const path = require('path');
const permissions = require('../permissions')

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'index.html'));
})

router.post("/", async (req, res)=> {
    try {
        var user = new User(req.body);
        await User.register(user, req.body.password, (err) => {
            if (err)  { throw err }
            console.log('Item has been saved')
            res.redirect('/login');
        });
    } catch (error) {
        res.status(400).send("unable to save to database");
    }
});

router.post("/addname", async (req, res)=> {
    try {
        var myData = new User(req.body);
        await myData.save()
        console.log('Item has been saved')
        res.redirect('/userlist');
    } catch (error) {
        res.status(400).send("unable to save to database");
    }
 });

//  Code to Update a User
router.post("/update", async (req, res) => {
    if (req.session.user) {
    try {
        const updateduser = await User.findOneAndUpdate({ _id: req.session.user._id },req.body)
        const role = permissions[updateduser.role]
        res.redirect(role.homepage);
    } catch (error) {
        res.status(400).send("unable to update to database");
        }
    } else{
     res.redirect('/login') 
    }
 })

// Code to Delete a User and keep you on the same page
router.post("/delete", async (req, res) => {
    try {
        await User.deleteOne({ _id: req.body.id })
        res.redirect('back')
    } catch (error) {
        res.status(400).send("unable to delete from database");
    }
 })

module.exports = router;