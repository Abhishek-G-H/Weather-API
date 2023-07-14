
require('dotenv').config()
const express = require("express");
const app=express();
const bodyParser = require("body-parser");

const https=require("https");

app.use(bodyParser.urlencoded({extended : true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    const querey=req.body.cityName;
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+querey+"&appid="+process.env.APPID+"&units="+unit;
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDes = weatherData.weather[0].description;
            console.log(weatherDes);
            const icon = weatherData.weather[0].icon;
            const imgURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1>Temparature in "+querey+" is "+temp+" degree Celcius.</h1>");
            res.write("<p>The weather is currently "+weatherDes+"</p>");
            res.write("<img src="+imgURL+">");
            res.send();
        });
    });
})

app.listen(3000,function(){
    console.log("Server is running on 3000.");
});