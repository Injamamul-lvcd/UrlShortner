const port = process.env.REST_PORT;
const responseLib=require('../libs/responseLib')
const shortid=require('shortid');
//import urlExist from "url-exist"
const {linkExists} =require('link-exists');
//creating shortURL using shortid
let createShortURL = async(req,res)=>{
    try{
        const {con}=require('../../www/db/db')
        //const urlExist=require('url-exist')
        const longUrl=req.body.longUrl;
        if(await linkExists(longUrl)){
          console.log(longUrl)
        //Check if the long URL already exists in the database
          const checkSql = 'SELECT short_code FROM urls WHERE long_url = ?';
          con.query(checkSql, [longUrl], (checkErr, checkResults) => {
          if(checkErr){
            throw new Error(checkErr);
          }else if(checkResults.length > 0){
        // URL already exists, return the existing short URL
          const existingShortCode = checkResults[0].short_code;
          const shortUrl = `http://localhost:${port}/${existingShortCode}`;
          res.status(200).send(responseLib.generate(false,"This is your short URL",shortUrl));
          }else{
          // URL doesn't exist, proceed with shortening
          const shortCode = shortid.generate(); 
          const insertSql = 'INSERT INTO urls (long_url, short_code) VALUES (?, ?)';
          con.query(insertSql, [longUrl, shortCode], (insertErr, insertResult) => {
            if (insertErr) {
              throw new Error('Error inserting URL into database:');
            }else{
              const shortUrl = `http://localhost:${port}/${shortCode}`;
              res.status(200).send(responseLib.generate(false,"This is your short URL",shortUrl));
            }
            });
            }
         });
        }else{
          res.status(200).send(responseLib.generate(false,"This url does not exist",null));
        }
      }catch(err){
          res.status(500).send(responseLib.generate(true,err.message,null))
      }
  }
// redirect to the original url 
  let redirOriginal= async(req,res)=>{
    try{
        const {con}=require('../../www/db/db')
        const shortCode = req.params.shortCode;
        const sql = 'SELECT long_url FROM urls WHERE short_code = ?';
        con.query(sql, [shortCode], (err, results) => {
        if(err){
            throw new Error(err);
        }else{
          if (results.length > 0){
            const longUrl = results[0].long_url;
            res.redirect(longUrl);
          }else{
            throw new Error('Short URL not found');
          }
        }
        });
    }catch(err){
        res.status(404).send(responseLib.generate(true,err.message,null));
    }
    
  }

  module.exports = {
    createShortURL:createShortURL,
    redirOriginal:redirOriginal
  }