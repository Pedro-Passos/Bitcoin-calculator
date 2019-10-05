//jshint esversion: 6
// requiring dependencies
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
// setting up Express Middleware with body-parser
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

// default route
app.post("/", function(req, res){
  // inserting POST elements into variables
  var crypto = req.body.crypto;
  var currency = req.body.currency;
  var amount = req.body.amount;
  // inserting variables into options object
  var options = {
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    method: "GET",
    qs: {
      from: crypto,
      to: currency,
      amount: amount
    }
  };

  // passing in object with POST elements and url info 
  request(options, function(error, response, body){
    // data from the request is converted to a JavaScript object  
    var data = JSON.parse(body);
    var price = data.price;
    var currentDate = data.time;
    res.write("<p>The current date is " + currentDate + "</p>");
    res.write("<h1>" + amount + crypto + " is currently worth " + price + currency + "</h1>");
    res.send();
  });
});

// listening for connections on the specified port
app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});
