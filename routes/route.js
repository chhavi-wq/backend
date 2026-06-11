const express=require("express")
const multer=require("multer")
const {Product,getallproducts,getbyidproduct,deleteproduct, searchProduct,updateProduct,updatePrice} = require("../controller/Product");
const { Creates, login, loginwitheemail, loginwithOtp, verify, getall, getbyid, deleteuser, searchuser, updatuser, updatepass, uploadimage } = require("../controller/controller")

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


const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads/assests")
    },
    filename:function(req,file,cb){
        cb(null, file.originalname)
    }
})

const upload = multer({ storage });

router.post("/upload/:id",upload.single("avatar"),uploadimage)
router.put("/updateprice",updatePrice);


module.exports=router