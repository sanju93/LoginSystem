let passport = require ('passport');
let passport_local = require('passport-local').Strategy;
let User = require('../models/user');

passport.use(new passport_local({
    usernameField : 'email'
},async (email,password,done) => {
    try{

        const user = await User.findOne({email : email})
        if (!user || password != user.password){
            console.log("Invalid username or password");
           
           
            return done(null,false);

        }
        else{
        

            return done(null,user);

        }

    }catch(err){

        console.log("error in finding the user",err);

        return done(err,false);

    }
}));

passport.serializeUser((user,done) => {
    done(null,user.id);
})

passport.deserializeUser(async (id,done) => {
  try{
     let user = await User.findById(id);
     if (user){
        return done(null,user);
     }else{
        return done(null,false);
     }
  }catch(err){
    return done(null,false);
  }
});

passport.setAuthenticated = (req,res,next) => {
    if(req.isAuthenticated()){
        res.locals.user = req.user._id;
    }
   return next();
}


module.exports = passport;

