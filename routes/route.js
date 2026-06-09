const express=require("express")
const {Product,getallproducts,getbyidproduct,deleteproduct} = require("../controller/Product");
const { Creates, login, loginwitheemail, loginwithOtp, verify, getall, getbyid, deleteuser } = require("../controller/controller")

const router=express.Router()

router.post("/create",Creates)

router.post("/login",login)
router.post("/loginwitheemail",loginwitheemail)
router.post("/loginwithotp",loginwithOtp)
router.post("/verify",verify)

router.get("/getall",getall)

router.get("/getbyid/:id",getbyid)
router.post("/Product",Product)

router.get("/getallproduct",getallproducts)

router.delete("/deleteuser/:id",deleteuser)
 
router.get("/getbyidproduct/:id",getbyidproduct);
router.delete("/deleteproduct/:id",deleteproduct);
module.exports=router