const express = require('express')
const connect = require('./config/db')
const cors = require("cors")
const { userRouter } = require('./Routes/User.route')
const {postRouter} = require("./Routes/Post.route")
const { authenticate} = require("./Midlewares/authenticate")
const app = express()

app.use(express.json())
app.use(cors())

const port =process.env.PORT


app.use("/users",userRouter)
app.use(authenticate)
app.use("/posts",postRouter)

app.listen(port , async () => {
    try{
        await connect
        console.log(`Connection to db success`) 
    }
    catch(err){
        console.log(err.message)
    }
    console.log(`Listening on the port ${port}`)
})