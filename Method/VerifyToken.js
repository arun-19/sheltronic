const express=require("express")
const verifyTokenRoute=express.Router()

verifyTokenRoute.get("/verifytoken",(req,res)=>{
      res.status(200).json({tokenData:req.tokenData})
})

module.exports=verifyTokenRoute