const bycript=require("bcryptjs")
const Decript=async (encpass,plainpass)=>{
    if(encpass){
        const dePass= await bycript.compareSync(plainpass,encpass)
        return dePass
    }
    return null
}
module.exports=Decript