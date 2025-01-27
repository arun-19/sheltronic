const express=require("express")
const DbConection = require("../Mysql/Connection")
const Encript = require("../Password/Encript")
const Decript = require("../Password/Decript")
const jwt=require("jsonwebtoken")
const LoginPostApi=express.Router()
require("dotenv").config()

LoginPostApi.post("/register",async (req,res)=>{
const  tbData=req.body
await Encript(tbData?.values[1]).then((encpassword)=>{
if(encpassword){

  tbData.values.splice(1,1,encpassword)


DbConection.query(`insert into ${tbData.table}(${tbData.fields})  value(?)`,[tbData?.values],(err,data)=>{
    if(err) return res.json({status:301,...err})
    return res.status(201).json({data})
   })
      }else{
     res.status(200).json({message:"Failed to Regiter"})
}

})

})


LoginPostApi.post("/login",(req,res)=>{
    const {user,pass}=req.body
    DbConection.query(`select * from user where user='${user}'`,async (err,data)=>{
        if(err) return res.status(301).json({err:err})
        const userdata=data


        if(userdata.length>0 && userdata[0]?.password){
            await Decript(userdata[0]?.password,pass).then((response)=>{
                if(response){
                const token=jwt.sign({user:userdata[0].user},process.env.KEY)
                 res.status(200).json({token})
                }
            })
        }else{
            res.status(204).json({message:"incorrect credentials User"})
        }
    })

})

module.exports=LoginPostApi