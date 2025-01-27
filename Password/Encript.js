const bycript=require("bcrypt")
const Encript=async (password)=>{
    if(password){
        const encPass= await bycript.hashSync(password,10)
        return encPass
    }
    return null
}
module.exports=Encript