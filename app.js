const express=require("express")

const mongoose=require("mongoose")
const router=require("./routes/route")

const PORT=4000

const app=express()
app.use(express.json())

app.use("/api",router)

mongoose.connect("mongodb://localhost:27017/mydatabase")
.then(()=>{
    console.log("connected")
})
.catch(()=>{
    console.log("not connected")
})

app.listen(PORT,()=>{
    console.log(`app is listen on port ${PORT}`)
})