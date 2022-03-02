const express = require("express");
const router = express.Router();
const User = require("../models/User")
const Movie = require("../models/Movie")
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.header("token")
    if (!token)
        return res.status(401).send("please log in first");

    try {
        const verified = jwt.verify(token, process.env.tokenSecret)
        // console.log("🚀 ~ file: user.js ~ line 13 ~ auth ~ verified", verified)
        req.user = verified
        next();
    } catch (error) {
        return res.status(400).send("Invalid token");
    }
}

router.post('/login', async (req, res) => {
    try {
        const { email , password } = req.body
        // const { error } = loginValidation(req.body);
        // if (error) return res.status(400).json(error.details[0].message);

        const foundUser = await User.findOne({ email: email });
        if (!foundUser) return res.status(400).send("Email not found");
        
        if (foundUser.password !== password) return res.status(400).send("Incorrect password");
        // const isMatched = await bcrypt.compare(req.body.password, foundUser.password);
        // if (!isMatched) return res.status(400).send("Incorrect Password");

        req.header.token = jwt.sign({ id: foundUser._id}, process.env.tokenSecret);
        res.json({
            user: foundUser,
            token: req.header.token
        })
    } catch (err) {
        res.json(err);
    }
});

router.post('/register', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (err) {
        res.json(err);
    }
});

router.post('/rate',auth, async (req, res) => {
    try {
        const userID = req.user.id
        const {movieID , rate} = req.body 
        const foundUser = await User.findById(userID)
        const foundMovie = await Movie.findById(movieID)
        const sum = Number(foundMovie.users.length)
        const oldRate = Number(foundMovie.rate)
        const newRate = (oldRate*sum + Number(rate)) / (sum+1)

        const movieObject = {movieID , rate} //will ba added into rates array in user object
        const userObject = {userID , rate} //will be added into users array in movie object then avg rate will be calculated

        var __FOUND = foundUser.rates.find(function(movie, index) {
            if(movie.movieID == movieID)
                res.json("you rated this movie before , to re-rate it delete the old rate then re-rate again");
        });

        const updatedUser = await User.findByIdAndUpdate(userID, { $addToSet: { rates: movieObject } },
            { new: true, runValidators: true, useFindAndModify: true })

        const updatedMovie = await Movie.findByIdAndUpdate(movieID, { $addToSet: { users: userObject } , rate : newRate },
            { new: true, runValidators: true, useFindAndModify: true })


        res.json({updatedUser ,updatedMovie });

    } catch (err) {
        res.json(err);
        console.log("🚀 ~ file: user.js ~ line 79 ~ router.post ~ err", err)
    }
});



module.exports = router;
