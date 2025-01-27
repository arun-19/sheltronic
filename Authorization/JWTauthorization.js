const jwt=require("jsonwebtoken")

const JwtAthoriztion= async (token,KEY)=>{

   return  await jwt.verify(token,KEY,(err,decode)=>{
    if(err) return null
    return decode
    })

}

module.exports=JwtAthoriztion