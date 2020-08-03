const express = require('express');
const router = express.Router();
const Cities = require('../model/cities');
const WeatherInfo = require('../model/weatherInformation');
const User = require('../model/user')
const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Middleware to authorize user

function authenticateToken(req, res, next) {

    const authHeader = req.headers['authorization']
    const token = authHeader.split(' ')[1]

    if (token == null) {
        return res.status(401).json({
            success: false,
            msg: 'Unauthorized',
        })
    }

    jwt.verify(token, config.secret, (err, user) => {
        if (err) {
            return res.status(403).json({
                success: false,
                msg: 'Forbidden'
            })
        }
        req.user = user.data
        next();
    })

}

// Get Today's Weather of Cities for Home Page

router.get('/getCitiesWeather', async (req, res) => {

    const numberOfDaysToAdd = 1;
    const today = new Date();
    const someDate = new Date();
    someDate.setDate(someDate.getDate() + numberOfDaysToAdd);

    const result = await WeatherInfo.aggregate([
        {
            $unwind: "$weather"
        },
        {
            $sort: { "weather.date": 1 }
        },
        {
            $match: { "weather.date": { $gte: today, $lt: someDate } }
        }, 
        {
            $project: { _id: 0 }
        }
    ])


    let arr = [];

    for(let i=0;i<6;i++){
         
        arr.push(result[i])
    }

    res.status(200).json({
        success: true,
        msg: 'Weather Info',
        result: arr
    })


})

// Get List of Cities

router.get('/getCities', authenticateToken, async (req, res) => {

    const cities = await Cities.find().exec();

    let listOfCities = [];

    for (let i = 0; i < cities.length; i++) {

        for (let j = 0; j < cities[i].names.length; j++) {

            listOfCities.push(cities[i].names[j])
        }
    }


    res.status(200).json({
        success: true,
        msg: 'list of cities',
        result: listOfCities
    })

})

// Get Weather Info of particular city

router.get('/weatherInfo/:city', authenticateToken, async (req, res) => {

    const numberOfDaysToAdd = 5;
    const today = new Date();
    const someDate = new Date();
    someDate.setDate(someDate.getDate() + numberOfDaysToAdd);

    const result = await WeatherInfo.aggregate([
        {
            $match: { "name": req.params.city }
        },
        {
            $unwind: "$weather"
        },
        {
            $sort: { "weather.date": 1 }
        },
        {
            $match: { "weather.date": { $gte: today, $lte: someDate } }
        },
        {
            $project: { _id: 0 }
        },
       
    ])

    if (!result) {
        return res.status(500).json({
            success: false,
            msg: 'No information found'
        })
    }

    const user = await User.findOneAndUpdate({ email: req.user.email },
        { $push: { "history": req.params.city } }
    );

    if (result && user) {
        res.status(200).json({
            success: true,
            msg: 'Weather Info',
            result: result
        })
    }

})

// Show search history to user

router.get('/getHistory', authenticateToken, async (req, res) => {

    const user = await User.findOne({ email: req.user.email });

    res.status(200).json({
        success: true,
        msg: 'List of Searched Cities',
        result: user.history.reverse()
    })
})

// Delete city from search history

router.delete('/deleteCity/:city', authenticateToken, async (req, res) => {

    const result = await User.update(
        { email: req.user.email },
        { $pull: { "history": req.params.city } })

    res.status(201).json({
        success: true,
        msg: 'Place from history deleted',
        result: result
    })

})

// Delete all search history

router.delete('/deleteHistory', authenticateToken, async (req, res) => {

    const result = await User.update(
        { email: req.user.email },
        { $set: { "history": [] } })

    res.status(201).json({
        success: true,
        msg: 'Place from history deleted',
        result: result
    })

})




module.exports = router;