let express = require('express');

let router = express.Router();

let Users_Controller = require('../controller/users_controller');
let passport = require('passport');

router.get('/',Users_Controller.signIN);
router.get('/sign_up',Users_Controller.signUp);
router.post('/sign_up_post',Users_Controller.SignUP_Post);
router.post('/sign_in_post',passport.authenticate('local',{failureRedirect : '/'}),Users_Controller.SignIn_post);

router.get('/profile',Users_Controller.profile);
router.get('/logout',Users_Controller.logout);



module.exports = router;