

module.exports.get_signup=(req,res)=>{
    res.render('signup')
}
module.exports.post_signup=(req,res)=>{
    res.send(200,"new user arrived")
}
module.exports.get_login=(req,res)=>{
    res.render('login')
}
module.exports.post_login=(req,res)=>{
    res.send(200,"new user logged in")
}