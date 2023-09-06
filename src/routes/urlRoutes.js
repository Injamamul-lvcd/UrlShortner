const controller=require('../controllers/urlController')


let setRouter = (app)=>{
    app.post('/shorten',controller.createShortURL)
    app.get('/:shortCode',controller.redirOriginal)
}
module.exports ={
    setRouter:setRouter
}