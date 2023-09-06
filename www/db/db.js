const mysql=require('mysql');
const server=require('../server/server')
let con;    
const startDB=(app)=>{
      try{
            con=mysql.createConnection({
                  host:'localhost',
                  user:'root',
                  password:"",
                  database:'Url_shortner',
            })
            con.connect((err) =>{
                  if(err) throw err;
                  module.exports.con=con;
                  console.log("database connection successful")
                  server.startServer(app);
            });
            
        }catch(err){
            console.log(err.message);
     }
}   
module.exports = {
      startDB:startDB
}