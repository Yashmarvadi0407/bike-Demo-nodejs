const express=require("express")
const app=express()

require('./db/conn.js')
const  router=require('./router/index.js')

app.use(express.json())
app.use(router)



app.listen(9000,(()=>{ console.log('server is connected')}))