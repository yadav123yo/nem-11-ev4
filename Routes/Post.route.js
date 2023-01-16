const express = require("express")
const {PostModel} = require("../Models/post.model")

const postRouter = express.Router()

postRouter.post("/", async (req,res)=>{

    let data=req.body
    try{
        const new_post = new PostModel(data)
        await new_post.save()
        console.log(new_post)
        res.send("added the new_note succesful")

    }catch(err){
        console.log(err)
        res.send({"error":"error is coming while posting"})

    }
    
})

postRouter.get("/", async (req,res)=>{
    let device=req.query
    try{
        const posts=await PostModel.find(device)
        res.send(posts)
    }catch(err){
        console.log(err)
        console.log({"error":"error something went wrong"})
    }
})

postRouter.patch("/update/:id" ,async (req,res)=>{
    
    const id = req.params.id;
    const {title,body,device}=req.body;

   await PostModel.updateOne({_id:id},{$set:{title:title,body:body,device:device}})
    res.send({mag:"Post updated"});
})

postRouter.delete("/delete/:id" ,async (req,res)=>{
    const id = req.params.id;
    await PostModel.deleteOne({_id:id})
    res.send({msg:"Todo Deleted"})
})
module.exports={
    postRouter
}