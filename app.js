const express = require("express");
const bodyparser =  require("body-parser");
const mongoose = require("mongoose");
const Feedback = require("./models/schema");
const path = require("path");
const ejsMate = require("ejs-mate");

const exp = require("constants");

const app = express();
const port = 3000;

const MONGO_URL = "mongodb://127.0.0.1:27017/feedback";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.use(bodyparser.urlencoded({ extended: true }));  
app.use(express.static('views'));
app.use(express.static('public'));
app.set("view engine", "ejs");
app.engine("ejs",ejsMate);

app.get("/",(req,res) => {
    res.sendFile(__dirname+ "/views/index.html");
});

app.post("/submitfb" , async(req,res) => {
    // console.log(req.body);
    const {name,contactno,email,feedbacktext} = req.body;

    const feedback = new Feedback ({
      name,
      contactno,
      email,
      feedbacktext,
    });

    try{
      await feedback.save();
      res.render("listings/page");

    }catch(err) {
      throw(err)
    }


})

app.listen(port,()=> {
    console.log("server is listenig to port 3000")
})
