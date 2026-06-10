const express=require("express")
const {Product,getallproducts,getbyidproduct,deleteproduct, searchProduct,updateProduct} = require("../controller/Product");
const { Creates, login, loginwitheemail, loginwithOtp, verify, getall, getbyid, deleteuser, searchuser, updatuser, updatepass } = require("../controller/controller")

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


router.post("/search",searchuser)
router.put("/updatuser/:id",updatuser)

router.put("/updatepass",updatepass)
router.post("/searchproduct", searchProduct);
router.put("/updateproduct/:id", updateProduct);
module.exports=router