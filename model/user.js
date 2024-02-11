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
//static method to login user
UserSchema.statics.login=async function(username,password){
  const user= await this.findOne({username})
  if(user){
    const auth=bcrypt.compare(password,user.password)
    if(auth){
        return user
    }
    throw new Error('incorrect password')
  }
  throw new Error('incorrect username')
}

const User=mongoose.model('users',UserSchema)

module.exports=User