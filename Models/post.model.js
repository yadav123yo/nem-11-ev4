const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
title:{type:String,required:true},
body:{type:String,required:true},
device:{type:String,required:true},
user_id:{type:String}

})


const PostModel = mongoose.model("post",PostSchema)
module.exports={
   PostModel
}