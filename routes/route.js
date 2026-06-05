const express=require("express")
const { Creates, login, loginwitheemail, loginwithOtp, verify } = require("../controller/controller")
const {Product} = require("../product/product")
const router=express.Router()

router.post("/create",Creates)

router.post("/login",login)
router.post("/loginwitheemail",loginwitheemail)
router.post("/loginwithotp",loginwithOtp)
router.post("/verify",verify)

router.post("/product",Product)

module.exports=router