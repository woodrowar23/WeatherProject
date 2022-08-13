const express = require("express");
const https = require("https"); //native node module so you don't have to install it
//connect to an external server like an api
const bodyParser = require("body-parser");
//to parse data from a submitted form

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
//to parse data from a submitted form
//{extended: true} allows you to post nested objects
//bodyParser requires it

app.get("/", function(req, res) {//the root route
  res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req,res){
  const city = req.body.cityName;
  const apiKey = "763a53fe32046202dd904104ad11a8c7";
  const unit ="imperial";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units="+unit;

  https.get(url, function(response) {//get api response within your get route
    console.log(response.statusCode);

    response.on("data", function(data) {//how to read data from JSON response
      const weatherData = JSON.parse(data);//method to parse the data from the response into JSON
      const temperature = weatherData.main.temp;//traverse the json
      const weatherDescription = weatherData.weather[0].description;
      console.log(weatherData);
      console.log(temperature);
      console.log(weatherDescription);
      res.write("<p>The weather is currently "+weatherDescription+".</p>");
      res.write("<h1>The temperature in " +city+ " is "+temperature+" degrees Fahrenheit.</h1>");
      const weatherIcon = weatherData.weather[0].icon;
      const imageUrl = "https://openweathermap.org/img/wn/"+weatherIcon+"@2x.png";
      res.write("<img src="+imageUrl+">");
      res.send();//response you're sending on the root route
      // const obj = {
      //   name: "Arien",
      //   age: 29
      // };
      // console.log(JSON.stringify(obj));//method to turn your Javascript object into a string
    });
  });

  // res.send("Server is up and running");//response you're sending on the root route
  //can only use one res.send per route
})



app.listen(3000, function() {
  console.log("server running on port 3000.");
});
//listen on port 3000
