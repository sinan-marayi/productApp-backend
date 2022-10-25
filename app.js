const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { productModel } = require("./models/product");

const app = express();

const url =
  "mongodb+srv://admin123:database@cluster0.egjrbk0.mongodb.net/productDb?retryWrites=true&w=majority";
mongoose.connect(url, { useNewUrlParser: true });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/api/addProduct", (req, res) => {
  var data = req.body;
  var productObject = new productModel(data);
  productObject.save((error, data) => {
    if (error) {
      res.json({ status: "error" });
    } else {
      res.json({ status: "success" });
    }
  });
});

app.get("/api/viewProducts", (req, res) => {
  productModel.find((error, data) => {
    if (error) {
      res.json({ status: "error" });
    } else {
      res.json(data);
    }
  });
});

app.post("/api/deleteProduct", (req, res) => {
    console.log(req.body.id);
    const data=req.body
  productModel.remove(data, (err, data) => {
    if (err) {
      res.json({ status: "success" });
    } else {
      res.json({ status: "error" });
    }
  });
});

app.post("/api/toUpdate",(req,res)=>{
    var data = req.body
    console.log(data);
    productModel.find(data,(err,data)=>{
        if (err) {
            res.send({"status" : "error"})
        } else {
            res.send({"status" : "success","data" : data})
        }
    })
})

app.listen(3000, () => {  
  console.log("server started on http://localhost:3000");
});
