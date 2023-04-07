const mongoose=require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/demo")
.then(()=>{ console.log("data base is connected")})
.catch((e)=>{ console.log(e)})

