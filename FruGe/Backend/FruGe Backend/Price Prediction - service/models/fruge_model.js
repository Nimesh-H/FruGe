const mongoose = require('mongoose')

//Define The table of the schema
const frugeSchema = mongoose.Schema({
    name: String,
    price: Number
});

//modify the today date format to the table name
var date = new Date();

var year = date.getFullYear();

var month = date.getMonth() + 1;
if(month <= 9)
    month = '0'+month;

var day= date.getDate();
if(day <= 9)
    day = '0'+day;

var TodayDate = year +'-'+ month +'-'+ day;
//create a fruge model by getting the collection name as the today date
const frugeModel = mongoose.model(TodayDate, frugeSchema);

module.exports = frugeModel;
