const mongoose = require("mongoose");

const productModel = mongoose.model("products", mongoose.Schema(
    {
        productName:String,
        productCode:String,
        manufacturingDate:String,
        expiringData:String,
        price:String
    }
));

module.exports = {productModel}
