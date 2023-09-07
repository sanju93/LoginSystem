let User = require('../models/user');

module.exports.signIN = (req,res) => {
    if (req.isAuthenticated()){
        return res.redirect('/profile');
    }
    return res.render('signIn');
}

module.exports.signUp = (req,res) => {
    return res.render('signUp');
}

module.exports.SignUP_Post = async (req,res) => {
    const {name , email,password,confirm_password} = req.body;

    if (password !== confirm_password){
        return res.redirect('back');
    }else{
        try{
         let user = await User.findOne({email : email});
         if (user){
            return res.redirect('/');
         }else{
            await User.create({
                name : name,
                email : email,
                password : password
            });

            return res.redirect('/');
         }
        }catch(err){
            console.log(err);
             return res.redirect('back');
        }
    }
}

module.exports.SignIn_post = (req,res) => {
      return res.redirect('/profile');
}

module.exports.profile = async (req,res) => {

  

    let user = await User.findById(req.user.id);


    return res.render('profile',{
        name : user.name,
        email : user.email
    });
}

module.exports.logout = (req,res) => {
    req.logout((err) => {
        if (err){
            return;
        }
    })

    return res.redirect('/');
}