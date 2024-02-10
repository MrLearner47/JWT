const mongoose=require('mongoose')
const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"username has to be unique"],
        required:[true,"Username is a required field"]
    },
    password:{
        type:String,
        required:[true,"password is a required field"]
  },
    email:{
        type:String,
        required:[true,"email is a required field"],
        unique:[true,"email is a unique field"],
        lowecase:[true,"email has to be in lowercase"]
    }
})
const User=mongoose.model('users',UserSchema)
module.exports=User