const Mysql=require("mysql")
const DbConection=Mysql.createConnection({user:"root",password:"root",database:"sheltronic"})
module.exports=DbConection