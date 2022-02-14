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

//! Import Routes
// const userRoute = require("./routes/users")
// app.use("/users", userRoute)

const Movie = require('./models/Movie')

app.get('/', async (req, res) => {
    res.send("we are on home")
})

app.get('/dashboard', async (req, res) => {
    try {
        const allMovies = await Movie.find({Name : "رابحة"})
        res.json(allMovies)
        // res.send("allMovies")

        
    } catch (error) {
        res.status(400).json(error)
    }
})


app.listen(port, () => {
    console.log(`listening on port ${port}`)
})