const http=require('http');
const startServer=(app)=>{
    try{
        const server=http.createServer(app);
        server.listen(process.env.REST_PORT);
        server.on('error',(err)=>{
            throw err;
        });
        server.on('listening',()=>{
            console.log('server is open in the port ',process.env.REST_PORT);
        });
        server.on('disconnect',()=>{
            console.log('server is disconnected');
        });
    }catch(err){
        console.log(err.message);
    }
};

module.exports ={
      startServer:startServer
}