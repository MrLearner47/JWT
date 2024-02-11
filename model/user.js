const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
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
UserSchema.pre('save', async function(next){
    const salt=await bcrypt.genSalt(10)
    this.password= await bcrypt.hash(this.password,salt)
     next() 
 })
//post is a hook used to create a process after something has been done


const User=mongoose.model('users',UserSchema)

module.exports=User