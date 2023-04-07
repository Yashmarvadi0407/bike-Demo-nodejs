const User = require("../modules/user");

const bcrypt=require("bcryptjs")
const validator=require("validator")

//registeruser
async function registeruser(req,res){
    const name1=req.body.name;
    const email=req.body.email;
    const pass1=req.body.pass;
    const phone1=req.body.phone;
   
    if(!name1) res.status(400).send({"meassge":"Enter User name "})
   
    if(!email) res.status(400).send({"meassge":"Enter User email "})
   
    if(!pass1) res.status(400).send({"meassge":"Enter User password "})
   
    if(!phone1) res.status(400).send({"meassge":"Enter User phone number "})
   
   if(!validator.isEmail(email)) res.status(400).send({"meassge":"Enter valid email"})
   
   if(!validator.isLength(pass1, 6, 10)) res.status(400).send({"meassge":" enter valid Password Length"})
   
   if(!validator.isLength(phone1, 6, 10)) res.status(400).send({"meassge":" enter valid Phone number"})
   
   if(isNaN(phone1)) res.status(400).send({"meassge":"Enter Numeric  phone data .."})
   
   if(!validator.isMobilePhone(phone1)) res.status(400).send({"meassge":"Enter valid phone number"})
   
   const findemail = await User.findOne({ email });
   if (findemail)
   return res.status(404).send({ message: "Email Already Exist!!" });
   
   const phone=req.body.phone
   const findphone = await User.findOne({ phone });
   if (findphone)
   return res.status(404).send({ message: "Phone Number Already Exist!!" });
   
      const user = new User(req.body)
      const token=await user.generateAuthToken();
      console.log(token)
     //  res.cookie("jwt",token)
     // console.log(cookie())
      try {
       await user.save();res.cookie("jwt",token)
       res.status(201).send(user);
     }
     catch(e){
        res.status(500).send({"message":"this is internal server error"})
       }
   
   }

//loginuser
   async function login(req,res){
    try{
     const email=req.body.email;
     const pass=req.body.pass;
     const useremail= await User.findOne({email:email})
     const isMatch=await bcrypt.compare(pass,useremail.pass)
     const token= await useremail.generateAuthToken()
    
     if(isMatch){
        res.status(200).json({"token":token})
     }
     else{
        res.status(401).send("invalid login detail")
     }
    }
    catch(e){
      console.log(e)
      res.status(401).send({"message":"this is internal server error"})
    }
}



//getalluserdata

async function getalldata(req,res){
    try{
        const allbikedata=await  User.find()
        res.status(200).send(allbikedata)
    }
    catch(e){
      res.status(500).send({"meassge":"this is internal server error"})
    }
   
  }








































   module.exports={
    registeruser,login,getalldata
   }