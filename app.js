const envConfig =require('dotenv').config({debug: process.env.DEBUG});

if(envConfig.error){
    throw envConfig.error;
}
const express=require('express')
const fs=require('fs')
const path=require('path')
const db=require('./www/db/db')

const app=express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const routesPath="./src/routes"

fs.readdirSync(routesPath).forEach((file)=>{
      if(~file.indexOf('.js'))
      {
            const routes=require(routesPath+"/"+file);
            routes.setRouter(app)
      }
});
//start the database
db.startDB(app);
