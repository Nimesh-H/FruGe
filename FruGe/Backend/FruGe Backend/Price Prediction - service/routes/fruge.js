var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var app = express();
var mongo = require('mongodb');
var cors = require('cors')

//create the connection with mongodb
const frugeModel = require('../models/fruge_model')
    mongoose.connect('mongodb+srv://fruge:frugedatabase@frugedatabase.4krmx.mongodb.net/Fruge')

//set the url /home to retrive the data from the collection
    app.get('/home',cors(), function(req, res){
    frugeModel.find(function(err, frugeListResponse){
        if(err){
            res.send(err);
        }
        else{
            const recordCount = frugeListResponse.length;
            console.log(frugeListResponse)
            //send the respond
            res.send(frugeListResponse)
        }
    });
});

app.listen(8888);