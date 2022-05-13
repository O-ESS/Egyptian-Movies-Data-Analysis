const express = require("express");
const router = express.Router();
const User = require("../models/User")
const Movie = require("../models/Movie")
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.header("token")
    // console.log(req.body)
    // console.log(req.headers)
    // console.log("token " + token)
    if (!token)
        return res.status(401).send("please log in first");

    try {
        const verified = jwt.verify(token, process.env.tokenSecret)
        // console.log(verified)
        // console.log("🚀 ~ file: user.js ~ line 13 ~ auth ~ verified", verified)
        req.user = verified
        next();
    } catch (error) {
        return res.status(400).send("Invalid token");
    }
}

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body
        // const { error } = loginValidation(req.body);
        // if (error) return res.status(400).json(error.details[0].message);

        const foundUser = await User.findOne({ name: username });
        if (!foundUser) return res.status(400).send("Username not found");

        if (foundUser.password !== password) return res.status(400).send("Incorrect password");
        // const isMatched = await bcrypt.compare(req.body.password, foundUser.password);
        // if (!isMatched) return res.status(400).send("Incorrect Password");

        req.header.token = jwt.sign({ id: foundUser._id }, process.env.tokenSecret);
        // console.log("hi" + req.header.token)
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

router.get('/foundRate/:movieID/:userID', auth, async (req, res) => {
    try {
        // const userID = req.user.id
        const { movieID, userID } = req.params
        // let found = false
        let rate

        // console.log(rate)

        const foundUser = await User.findById(userID)
        const foundMovie = await Movie.findById(movieID)

        if (userID) {
            console.log("73")
            foundUser.rates.forEach((element) => {
                if (element.movieID == movieID) {
                    // found = true
                    console.log("here")
                    rate = element.rate
                }
            })
        }

        console.log("🚀 ~ file: user.js ~ line 83 ~ router.get ~ rate", rate)
        return res.json(rate)
    } catch (err) {
        res.json(err);
    }
});
router.get('/hh', auth, async (req, res) => {
    try {
        console.log("ha,amas")
        return res.json("rate")
    } catch (err) {
        res.json(err);
    }
});

router.post('/rate', auth, async (req, res) => {
    try {
        const userID = req.user.id
        let { movieID, rate } = req.body
        rate = Number(rate) / 20
        const foundUser = await User.findById(userID)
        const foundMovie = await Movie.findById(movieID)
        let found = false;
        let allRates = 0
        const sum = Number(foundMovie.users.length)

        foundMovie.users.forEach((movie) => {
            allRates += Number(movie.rate)
            if (movie.userID == userID) {
                found = true
            }
        })

        console.log("🚀 ~ file: user.js ~ line 106 ~ router.post ~ found", found)



        if (!found) {

            const oldRate = Number(foundMovie.rate)
            const newRate = (oldRate * sum + Number(rate)) / (sum + 1)

            // console.log("rate "+newRate)
            const movieObject = { movieID, rate } //will ba added into rates array in user object
            const userObject = { userID, rate } //will be added into users array in movie object then avg rate will be calculated


            //    console.log(newRate)
            const updatedUser = await User.findByIdAndUpdate(userID, { $addToSet: { rates: movieObject } },
                { new: true, runValidators: true, useFindAndModify: true })

            const updatedMovie = await Movie.findByIdAndUpdate(movieID, { $addToSet: { users: userObject }, rate: newRate },
                { new: true, runValidators: true, useFindAndModify: true })


            res.json({ updatedUser, updatedMovie, found });
        }

        else {

            const avgRate = allRates / sum

            const updatedUser = await User.findOneAndUpdate(
                {
                    _id: userID,
                    rates: { $elemMatch: { movieID: movieID } }
                },

                { $set: { "rates.$.rate": rate } },

                { new: true, runValidators: true, useFindAndModify: true })



            const updatedMovie = await Movie.findOneAndUpdate(
                {
                    _id: movieID,
                    rates: { $elemMatch: { userID: userID } }
                },


                {
                    $set: { "rates.$.rate": rate },
                    rate: avgRate
                },

                { new: true, runValidators: true, useFindAndModify: true })


            res.json({ updatedUser, updatedMovie, found });
            //return res.status(400).json("you rated this movie before , to re-rate it delete the old rate then re-rate again")
        }

    } catch (err) {
        console.log("🚀 ~ file: user.js ~ line 79 ~ router.post ~ err", err)
        res.json(err);
    }
});




// router.post('/deleterate',auth, async (req, res) => {
//     try {
//         const userID = req.user.id
//         const {movieID , rate} = req.body 
//         const foundUser = await User.findById(userID)
//         const foundMovie = await Movie.findById(movieID)
//         const sum = Number(foundMovie.users.length)
//         const oldRate = Number(foundMovie.rate)
//         const newRate = (oldRate*sum + Number(rate)) / (sum+1)

//         const movieObject = {movieID , rate} //will ba added into rates array in user object
//         const userObject = {userID , rate} //will be added into users array in movie object then avg rate will be calculated

//         var __FOUND = foundUser.rates.find(function(movie, index) {
//             if(movie.movieID == movieID){
//                 res.json("you rated this movie before , to re-rate it delete the old rate then re-rate again");
//             }
//         });

//         const updatedUser = await User.findByIdAndDelete(userID, { $addToSet: { rates: movieObject } },
//             { new: true, runValidators: true, useFindAndModify: true })

//         const updatedMovie = await Movie.findByIdAndUpdate(movieID, { $addToSet: { users: userObject } , rate : newRate },
//             { new: true, runValidators: true, useFindAndModify: true })


//         res.json({updatedUser ,updatedMovie });

//     } catch (err) {
//         res.json(err);
//         console.log("🚀 ~ file: user.js ~ line 79 ~ router.post ~ err", err)
//     }
// });




module.exports = router;
