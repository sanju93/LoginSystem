
let express = require('express');
let passport = require('passport');
require('./config/passport_local');

let app = express();
let port = 8000;
let express_ejs_layouts = require('express-ejs-layouts');
require('./config/mongoose');
let express_session = require('express-session');
let MongoStore = require('connect-mongo');

app.use(express.static('./assets'));
app.use(express.urlencoded());
//views
app.set('view engine','ejs');
app.set('views','./views');
app.use(express_ejs_layouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(express_session({
    name : "loginSystem",
    secret : "sanjay",
    cookie : {
        maxAge : (1000 * 60 * 60 * 24)
    },
    store : MongoStore.create({mongoUrl : "mongodb://localhost:27017/LoginSystem"})
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticated);



app.use('/',require('./routes/index'));


app.listen(port,(err) => {
    if(err){
        console.log(err);
        return;
    }
    console.log("server connected on port :",port);
})