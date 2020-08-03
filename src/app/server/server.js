require('express-async-errors');
let express = require('express');
let bodyparser = require('body-parser');
let cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/config');

let app = express();
app.use(cors());
app.use(bodyparser.json());

app.use('/user', require('./route/user'))
app.use('/auth',require('./route/auth'))

mongoose.connect(config.database,{
  useMongoClient:true,
  useFindAndModify: false
});

mongoose.connection.on('connected',()=>{
    console.log('mongodb connected');
})

mongoose.connection.on('error',(err)=>{
    console.log(err);
})


app.use(function(err,req,res,next){
    throw err;
});

const port = process.env.PORT||3000;

app.listen(port,()=>{
    console.log("server started at port "+port);
})