var mongo = require('mongodb');
var mongoose = require('mongoose')
var assert = require('assert');
const { debuglog } = require('util');
var express = require('express');
var app = express();


var cors = require('cors')

app.use(cors()) 
var listener = app.listen(8888);
app.get('/', cors(), (req, res) => res.send('FRUGE'));
app.listen(3000);




