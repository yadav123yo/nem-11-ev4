const express = require("express")
const {userModel, UserModel} = require("../Models/user.model")
const bcrypt = require("bcrypt")
let jwt = require("jsonwebtoken")
require("dotenv").config()


const userRouter = express.Router()

// Signup route
userRouter.post("/register", async (req,res)=> {
    const {email,password,name,gender} = req.body

    try{
        bcrypt.hash(password,2,async (err,newsecure_password)=>{
            if(err){
                console.log(err)
            } else {
                const user =  new UserModel({email, password:newsecure_password,name,gender})
                await user.save()
                res.status(200).send("user registered success")
            }
        })

    }catch(err){
        res.send(err)
        console.log(err)
    }
})

// LOGIN Route...

userRouter.post("/login", async (req,res) =>{
    const {email, password} = req.body

    try {
        const user = await UserModel.find({email})
        const hashed_password = user[0].password

        if(user.length > 0){
            bcrypt.compare(password, hashed_password, (err,result)=>{
                if(result){
                    const token  = jwt.sign({userID:user[0]._id}, process.env.jwtSign)
                    res.send({"message":"Login Succefully", "token" : token})
                } else {
                    res.status(400).send("wrong Crediential")
                }
            })
        } else {
            res.status(400).send("wrong Crediential")
        }

    } catch (err) {
        console.log(err)

    }
})

module.exports = {
    userRouter
}