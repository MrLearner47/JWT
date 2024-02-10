const express=require('express')
const path= require('path')
const app=express()
const mongoose=require('mongoose')
const AuthRoutes=require('./routes/UserAuthRoutes')
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'))

const dbUri="mongodb://localhost:27017/mydb/users";
mongoose.connect(dbUri,{useNewUrlParser:true, useUnifiedTopology: true })
.then((result)=>app.listen(5000))
.catch((error)=>{
    console.error(error)
})
app.get('/',(req,res)=>{
    res.render('home')
})
app.get('/cars',(req,res)=>{
      res.render('cars')
})
app.use(AuthRoutes)
