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
app.use("/uploads/assests", express.static("uploads/assests"));

const mongoUrl = process.env.MONGO_URL
console.log(mongoUrl)

mongoose.connect(mongoUrl, { serverSelectionTimeoutMS: 10000 })
  .then(() => {
    console.log("connected to MongoDB")
    app.listen(PORT, () => {
      console.log(`app is listening on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message)
    console.error(error)
    process.exit(1)
  })