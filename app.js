const express=require("express")
const swaggerSpec=require("./swagger")
const swaggerUi=require("swagger-ui-express")
const mongoose=require("mongoose")
const router=require("./routes/route")
const cors=require("cors")
require("dotenv").config();
const PORT=process.env.PORT 

const app=express()
app.use(express.json())
app.use(
  cors({
    origin: "http://localhost:5173"            //install cors
  })
);
app.use("/api",router)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

mongoose.connect("mongodb://localhost:27017/mydatabase")
.then(()=>{
    console.log("connected")
})
.catch(()=>{
    console.log("not connected")
})

app.use("/uploads", express.static("uploads/assests"));

app.listen(PORT,()=>{
    console.log(`app is listen on port ${PORT}`)
})