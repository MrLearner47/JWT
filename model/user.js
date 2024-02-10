const mongoose=require('mongoose')
const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowecase:true,
    }
})
module.exports=mongoose.model('users',UserSchema)