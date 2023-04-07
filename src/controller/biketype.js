const BikeType = require("../modules/bike_type");

//postbiketype
async function postbiketype(req,res){

    const typename=req.body.typename
    const findtype = await BikeType.findOne({ typename });
    if (findtype)
    return res.status(400).send({ message: "Type is  Already Exist" });
    
  
    const biketype=new BikeType(req.body)
  
    try{
  
      biketype.save().then(()=>{ res.status(201).send(biketype)})
      
    }
    catch(e){
      res.status(500).send({"message":"this is internal server error"})
    }
  }

//getbike type
async  function getbiketype(req,res){
    try{
        const allbiketypedata=await  BikeType.find()
        res.status(200).send(allbiketypedata)
    }
    catch(e){
      res.status(500).send({"message":"this is internal server error"})
    }
   
}

  module.exports={
    postbiketype,getbiketype
  }