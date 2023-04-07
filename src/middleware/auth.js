const jwt=require("jsonwebtoken")


const auth=(req,res,next)=>{
    try{
            let token=req.headers.authorization;
            if(token){
                token=token.split(" ")[1]
                let user =jwt.verify(token,`${process.env.SECRET_KEY}`)
                console.log(user)
            }
            else{
                res.status(401).send({ "meassge":" Unauthorized user"})
            }
            next()
    }
    catch(e){
        console.log(e)
        res.status(401).send({ "meassge":" Unauthorized user"})

    }
}

module.exports=auth