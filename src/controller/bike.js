const Bike = require("../modules/bike");
const validator=require("validator")

//postbikedata
async function postbike(req,res){
    try{
     const bikename=req.body.name
     const speed=req.body.highest_speed;
     const engine=req.body.enginecc;
     const color=req.body.color;
     const average=req.body.milage;
     const price=req.body.price
     const biketype=req.body.biketype
    
     if(!bikename) res.status(400).send({"meassge":"Enter Bike Name.."})
     
     if(!speed ) res.status(400).send({"meassge":"Enter Bike Speed.."})
    
     if(!engine) res.status(400).send({"meassge":"Enter Bike Engine Details"})
     
     if(!color) res.status(400).send({"meassge":"Enter Bike color..."})
     
    if(!average) res.status(400).send({"meassge":"Enter Bike milage Details.."})
     
    if(!biketype) res.status(400).send({"meassge":"Enter Bike type Id. Because Biketype Id is important."})
    
    if(!price) res.status(400).send({"meassge":"Enter Price .."})
    
    if(isNaN(speed)) res.status(400).send({"meassge":"Enter Numeric  Speed Data.."})
     
    if(isNaN(engine)) res.status(400).send({"meassge":"Enter Numeric  Engine Data.."})
     
    if(!isNaN(color)) res.status(400).send({"meassge":"Enter String Data For color.."})
     
    
    if(isNaN(average)) res.status(400).send({"meassge":"Enter numeric milage  Data.."})
    
    if(isNaN(price)) res.status(400).send({"meassge":"Enter price Data.."}) 
    
    if(validator.isEmpty(bikename,[{ignore_whitespace: false }])){
      res.status(400).send({"meassge":" Bike field is not empty..........."})
     }
  const name=req.body.name
   const findbikename = await Bike.findOne({ name });
   if (findbikename)
   return res.status(404).send({ message: "Bike Name is  Already Exist!!" });
   
        const bike=new Bike(req.body)
        bike.save().then(()=>{ res.status(201).send(bike)})
    }
    catch(e){
      console.log(e)
      res.status(500).send({"message":"this is internal server error"})
    } 
    
    }

//getallbike
async function getallbike(req,res){
    try{
        const allbikedata=await Bike.find().populate("biketype","typename")
        res.status(200).send(allbikedata)
    }
    catch(e){
      console.log(e)
      res.status(500).send({"message":"this is internal server error"})
    }
   
}

//deletebike
async function deletebike(req,res){
    try
    {
       const _id =req.params.id;
       const deletebike = await Bike.findByIdAndDelete(_id);
    //console.log(deletebike)

      if(!deletebike){
        return res.status(400).send({"meassge":" data is already deleted"})
      } else{
       res.status(200).send(deletebike) }
    } 
    catch(e){
        res.status(400).send({"meassge":" id is not match"})

    }
}

//updatebike
async function updatebike(req,res){
 
    try {
       const _id=req.params.id
       //console.log(_id)
       const updatebike = await Bike.findByIdAndUpdate(_id,req.body,{new:true})
       
       //console.log(updatebike)
       res.status(200).send(updatebike)
    } 
    catch(e){

      res.status(400).send({"meassge":" id is not match"});
    }
}

//get recently added bike
async function recentlybike(req, res){
    try {
      const recentbike = await Bike.find().sort({ _id: -1 }).limit(1);
      res.status(200).send(recentbike);
    } catch (e) {
      res.status(500).send({"message":"this is internal server error"});
    }
  }

//get bike by bikeid
async function getbikebybiketype(req,res){
    try{ 
     const bike_id=req.params.bike_id
     if(bike_id) {
     const bike= await Bike.find({biketype:bike_id}).populate("biketype","typename").limit(2)
        res.status(200).send(bike)
    }
   else{
     res.status(400).send({"meassge":"bike id is required"})
   }}
    catch (e){
        res.status(400).send({"meassge":" BIKE ID ID INVALID"})
    }
}

//likebike
async function likebike(req, res) {
    try {
      const bike = await Bike.findById(req.params.id);
      
      const likes = bike.likes;
      likes.push(req.body.likes);
      bike.likes = likes;
      await bike.save();
      res.send(bike);
    }
     catch(e) {
      res.status(400).send("INVALID BIKE ID");
    }
  }

//dislike bike
async function dislike(req, res) {
    try {
      const bike = await Bike.findById(req.params.id);
      const likes = bike.likes;
      likes.pop(req.body.likes);
      bike.likes = likes;
      await bike.save();
      res.send(bike);
    }
     catch(e) {
      res.status(400).send("INVALID BIKE ID");
    }
  }


//get most bike
async function mostlike(req, res) {
    try {
      let maxlikes = 0;
      let maxlikedbike = {};
      const bikes = await Bike.find({});
      if (!bikes[0]) {
        return res.status(404).send({ error: "Not Found!" });
      }
      for (let i = 0; i < bikes.length; i++) {
        if (bikes[i].likes.length > maxlikes) {
          maxlikes = bikes[i].likes.length;
          maxlikedbike = bikes[i];
        }
      }
      res.send({ totalLikes: maxlikes, maxlikedbike });
    } catch (e) {
      res.status(500).send({"message":"this is internal server error"});
    }
    }

//usercomments on bike
async function comment(req, res) {
    try {
        const post = await Bike.findById(req.params.id)
        const comments = post.comments;
        comments.push(req.body.comments);
        post.comments = comments;
        await post.save();
        res.send(post);
      } catch (e) {
        res.status(400).send(e);
      }
  }







    module.exports={
        postbike,getallbike,deletebike,
        updatebike,recentlybike,getbikebybiketype,
        likebike,dislike,mostlike,comment
    }