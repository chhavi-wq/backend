const mongoose = require("mongoose");

const ApiSchema = new mongoose.Schema({
    title:{
        type : String,
    },
    price:{
        type : Number,
    },
    stock:{
        type : String,
    },
    description : {
        type : String
    },
    id : {
        type : Number
    }
   

})

const Usser = mongoose.model("Usser",ApiSchema);
module.exports = Usser;