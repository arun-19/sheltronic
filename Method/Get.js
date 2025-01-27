
const express=require("express")
const DbConection = require("../Mysql/Connection")
const Get=express.Router()

Get.get("/getUser",async (req,res)=>{
    DbConection.query(`select * from user where user='${req?.tokenData?.user}'`,async (err,data)=>{
        if(err) res.status(300).json({message:err})
        res.status(200).json({...data[0]})
    })

})


module.exports=Get
