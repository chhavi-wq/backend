const express=require("express")
const multer=require("multer")
const {Product,getallproducts,getbyidproduct,deleteproduct, searchProduct,updateProduct,uploadpic} = require("../controller/Product");
const { Creates, login, loginwitheemail, loginwithOtp, verify, getall, getbyid, deleteuser, searchuser, updatuser, updatepass, uploadimage } = require("../controller/controller")

const router=express.Router()



/**
 * @swagger
 * /api/create:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstname
 *               - email
 *               - mobile
 *               - country
 *               - password
 *             properties:
 *               firstname:
 *                 type: string
 *                 example: John
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               mobile:
 *                 type: Number
 *                 example: 9876543210
 *               country:
 *                 type: string
 *                 example: India
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: user create successfully
 *                 newuser:
 *                   type: object
 *       400:
 *         description: Email already exists
 *       401:
 *         description: All fields required
 *       500:
 *         description: Internal server error
 */

router.post("/create",Creates)


/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login a user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *     responses:
 *       201:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: user create successfully
 *                 newuser:
 *                   type: object
 *       400:
 *         description: Email already exists
 *       401:
 *         description: All fields required
 *       500:
 *         description: Internal server error
 */


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

const store = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"post/images")
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }

})
const post = multer({ storage: store });
router.post("/post/:id", post.single("image"), uploadpic);

router.post("/upload/:id",upload.single("avatar"),uploadimage)




module.exports=router