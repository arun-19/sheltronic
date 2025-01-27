const express=require("express")
const app=express();
const cors=require("cors")
const bodyparser=require("body-parser");
const DbConection = require("./Mysql/Connection");
const LoginPostApi = require("./Method/LoginPost");
const JwtAthoriztion = require("./Authorization/JWTauthorization");
const Post = require("./Method/Post");
const verifyTokenRoute = require("./Method/VerifyToken");
const Get = require("./Method/Get");
require("dotenv").config()

app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
DbConection.connect((err)=>{
    if(err) return console.log(err);
    console.log("Connection Succeed");
})
const Authnticate=(req,res,next)=>{
    const token=req?.headers?.authorization
    const splitdata=token && token?.split(" ")[1]


    if(splitdata){
       JwtAthoriztion(splitdata,process.env.KEY).then((resdata)=>{
       req.tokenData=resdata
        next()
       }).catch((err)=>{
        console.log(err);

       })
    }

}

app.use(LoginPostApi)
app.use(Authnticate,verifyTokenRoute)
app.use(Authnticate,Get)
app.use(Authnticate,Post)

app.listen(5000,()=>{
    console.log("listioning.....");

})