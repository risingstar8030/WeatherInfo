const express = require('express');
const router = express.Router();
const User = require('../model/user')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config')

// Register User

router.post('/register', async (req, res) => {

    const user = await User.findOne({
        email: req.body.email
    });

    if (user) {
        return res.json({
            success: false,
            msg: 'User already exists'
        })
    }

    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        history: []
    })

    const result = await newUser.save();

    res.status(201).json({
        success: true,
        msg: 'User Registered Successfully'
    })

})

//Login User

router.post('/login', async (req, res) => {

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.json({
            success: false,
            msg: 'User not found'
        })
    }

    if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.json({
            success: false,
            msg: 'Invalid login credentials'
        })
    }

    const data = {
        firstName: user.firstName,
        lastName: user.lastName,
        email : user.email
    }

    const token = jwt.sign({ data: data }, config.secret, { expiresIn: '1h' });

    res.status(200).json({
        success: true,
        msg: "User logged in successfully",
        token: token,
        user: {
            firstName: user.firstName,
            lastName: user.lastName
        }
    })
})




module.exports = router;