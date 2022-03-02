const express = require("express")
const app = express();
const port = 8080;
const cors = require("cors")
const mongoose = require("mongoose")
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: true,
    // useCreateIndex: true
};

if (process.env.NODE_ENV !== "production") {
    const dotenv = require("dotenv")
    dotenv.config()
}
mongoose.connect(process.env.urlDB, connectionParams)
    .then(() => console.log("DB CONNECTED!!!"))
    .catch((err) => console.log("DB FAILED !!!!", err))

//middle ware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const userRoute = require("./routes/user")
app.use("/auth", userRoute)

//! Import Routes
// const userRoute = require("./routes/users")
// app.use("/users", userRoute)

const Movie = require('./models/Movie')

// app.get('/', async (req, res) => {
//     res.send("we are on home")
// })

app.get('/', async (req, res) => {
    try {
        const result = await Movie.find({}).sort({rate : -1}).limit(9)
        res.json(result)
        // res.send("allMovies")

        
    } catch (error) {
        res.status(400).json(error)
    }
})

app.get('/:movieID', async (req, res) => {
    try {
        const { movieID } = req.params
        const result = await Movie.findById(movieID)
        res.json(result)
        // res.send("allMovies")

        
    } catch (error) {
        res.status(400).json(error)
    }
})

app.get("/search?", async (req, res) => {
    try {
        const { q } = req.query
        // const x1 = q.trim().replace(/ +/gi, "_")
        // const x2 = q.trim().replace(/ +/gi, "")
        const regex1 = new RegExp(q, "gi")
        // const regex2 = new RegExp(x2, "gi")
        // const regex = new RegExp(q, "gi")
        // const regexAny = new RegExp(`[${q}]`, "gi")
        // const regexNum = /0-9/
        const result = await Movie.find({
            $or: [{ Name: regex1 },
            { Synopsis: regex1 },
            ]
        })
        res.json(result)
    } catch (error) {
        res.json(error)

    }
})

app.get("/filter?", async (req, res) => {
    try {
        const { Category } = req.query
        // const x1 = q.trim().replace(/ +/gi, "_")
        // const x2 = q.trim().replace(/ +/gi, "")
        const regex1 = new RegExp(Category, "gi")
        // const regex2 = new RegExp(Actors, "gi")
        // const regex2 = new RegExp(x2, "gi")
        // const regex = new RegExp(q, "gi")
        // const regexAny = new RegExp(`[${q}]`, "gi")
        // const regexNum = /0-9/
        const result = await Movie.find({
            $and: [{ Category: regex1 },
            // { Actors: regex2 },
        ]
        })
        res.json(result)
    } catch (error) {
        res.json(error)

    }
})

// app.patch("/rate", async (req, res) => {
//     try {
//         const result = await Movie.updateMany({},[
//             {
//                 $addFields: { "rate": 0 }
//             }
//         ])
       
//         res.json(result)
//     } catch (error) {
//         res.json(error)

//     }
// })





app.listen(port, () => {
    console.log(`listening on port ${port}`)
})