const mongoose=require("mongoose")
const validator=require("validator")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const useschema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:[true,"already present"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error.message(" Enter valid email")
            }
        }
    },
    phone:{
        type:Number,
        min:10,
        require:true,
        unique:false

    },
    pass:{
        type:String,
        unique:true,
        trim:true,
        required:true
    }
},{
        timestamps:true
      
}
   )

//generating token
useschema.methods.generateAuthToken=async function(){

    try{
        const token=jwt.sign({_id:this.id.toString()},`${process.env.SECRET_KEY}`)
        return token
        

    }
    catch(error){
        console.log(error)

    }
}

useschema.pre("save",async function(next){
  if(this.isModified("pass")){
    this.pass=await bcrypt.hash(this.pass,10)
    //console.log(this.pass)  
}
 next()
})


const User=new mongoose.model("User",useschema)

module.exports=User;


