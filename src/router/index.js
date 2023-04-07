//const mongoose=require("mongoose")
const User = require("../modules/user")
const express=require("express")
const app=express()
const router=new express.Router()
const auth = require("../middleware/auth")
const {registeruser,login,getalldata}=require("../controller/user")
const {postbike,getallbike,deletebike,updatebike,recentlybike,getbikebybiketype,likebike,dislike,mostlike, comment}=require("../controller/bike")
const {postbiketype,getbiketype}=require("../controller/biketype")

//post user data(register)
router.post("/data", registeruser)

//post (login user)
router.post("/login",login)

//get all user data
router.get("/getalldata",auth,getalldata)

//post bike data
router.post("/bikedata",auth,postbike)

//get all bike
router.get("/getallbike",auth,getallbike)

// delete bike
router.delete("/deletebike/:id",auth,deletebike)

//update bike data
router.patch("/updatebike/:id",auth, updatebike)

//get recently added bike
router.get("/recent", auth,recentlybike);

//get bike by bike types
router.get("/getbybikeid/:bike_id",auth,getbikebybiketype)

//like bike
router.patch("/like/:id", auth,likebike);

//dislike
router.patch("/dislike/:id",auth, dislike);

//post bike-type data
router.post("/biketypedata",auth,postbiketype)

//get all bike types
router.get("/getallbiketype",auth,getbiketype)

//comments
router.patch("/bikecomment/:id",auth, comment);

//mostliked bike
router.get("/mostbike", auth,mostlike);

module.exports=router;