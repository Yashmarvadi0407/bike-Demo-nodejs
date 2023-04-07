const mongoose=require("mongoose")

const biketypeschema=mongoose.Schema({
    typename:{
        
        type:String,
        trim:true,
        required:true,
        minlength:2,
        unique:[true,"biketype is already present"]
}

})

const BikeType=new mongoose.model("BikeType",biketypeschema)

module.exports=BikeType;