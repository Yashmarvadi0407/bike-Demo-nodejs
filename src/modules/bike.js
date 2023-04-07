const mongoose=require("mongoose")

const bikeschema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:2,
        maxlength:10,
        trim:true
    },
    highest_speed:{
         type:Number,
         required:true,
         min:3
    },
    enginecc:{
        type:Number,
        required:true,
        min:1,
        
    },
    color:{
        type:String,
        required:true,
        minlength:3
    },
    milage:{
        type:Number,
        required:true,
        min:1
    },
    price:{
        type:Number,
        min:2
    },
  
    likes:[
         {
            type: String,
            optional:true
          }
    ],
    biketype: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "BikeType",
      }]
    ,
      comments: [
        {
          type: String,
          optional: true,
      }
      ] ,
    },{
        timestamps:true
      
})

const Bike=new mongoose.model("Bike",bikeschema)

module.exports=Bike;