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
 *       - Create a User
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
 *                   example: user logged in successfully
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
 *       - Login 
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
 *                   example: user logged in successfully
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

/**
 * @swagger
 * /api/loginwitheemail:
 *   post:
 *     summary: Login user using email and password
 *     tags:
 *       - Login with Email
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
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: user logged in successfully
 *                 user:
 *                   type: object
 *                   example:
 *                     _id: 64a8f1e9c1a2
 *                     firstname: John
 *                     email: john@example.com
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Invalid email or password
 *       401:
 *         description: Email and password are required
 *       500:
 *         description: Internal server error
 */

router.post("/loginwitheemail",loginwitheemail)

/**
 * @swagger
 * /api/loginwithotp:
 *   post:
 *     tags:
 *       - Login with OTP
 *     summary: Login with Email & Password and Send OTP
 *     description: Validate email & password, generate OTP, and send it to email
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
 *                 example: Password@123
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       401:
 *         description: Missing fields or incorrect password
 *       404:
 *         description: Email not found
 *       500:
 *         description: Internal server error
 */

router.post("/loginwithotp",loginwithOtp)
/**
 * @swagger
 * /api/verify:
 *   post:
 *     tags:
 *       - Verify a User
 *     summary: Verify OTP and Login
 *     description: Verify email OTP and complete login process
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               otp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid OTP
 *       404:
 *         description: Email not found
 *       500:
 *         description: Internal server error
 */

router.post("/verify",verify)

/**
 * @swagger
 * /api/getall:
 *   get:
 *     tags:
 *       - Get All Users
 *     summary: Get all users
 *     description: Fetch all users from the database
 *     responses:
 *       200:
 *         description: Successfully retrieved users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: all user
 *                 use:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 64b7f0e9f1c2a1b234567890
 *                       email:
 *                         type: string
 *                         example: john@example.com
 *                       otp:
 *                         type: string
 *                         nullable: true
 *       500:
 *         description: Internal server error
 */
router.get("/getall",getall)

/**
 * @swagger
 * /api/getbyid/{id}:
 *   get:
 *     tags:
 *       - Get User by ID
 *     summary: Get user by ID
 *     description: Fetch a single user using MongoDB ObjectId
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *           example: 64b7f0e9f1c2a1b234567890
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: user found
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 64b7f0e9f1c2a1b234567890
 *                     email:
 *                       type: string
 *                       example: john@example.com
 *                     otp:
 *                       type: string
 *                       nullable: true
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: user not found
 *       500:
 *         description: Internal server error
 */

router.get("/getbyid/:id",getbyid)
// router.post("/Product",Product)

// router.get("/getallproduct",getallproducts)

/**
 * @swagger
 * /api/deleteuser/{id}:
 *   delete:
 *     tags:
 *       - Delete User
 *     summary: Delete user by ID
 *     description: Delete a user using MongoDB ObjectId
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *           example: 64b7f0e9f1c2a1b234567890
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: user deleted
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 64b7f0e9f1c2a1b234567890
 *                     email:
 *                       type: string
 *                       example: john@example.com
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: user not found
 *       500:
 *         description: Internal server error
 */

router.delete("/deleteuser/:id",deleteuser)
 
// router.get("/getbyidproduct/:id",getbyidproduct);
// router.delete("/deleteproduct/:id",deleteproduct);

/**
 * @swagger
 * /api/search:
 *   post:
 *     tags:
 *       - Search User
 *     summary: Search users
 *     description: Search users by first name or email using a query string
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         description: Search keyword (firstname or email)
 *         schema:
 *           type: string
 *           example: john
 *     responses:
 *       200:
 *         description: Users found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: user data
 *                 user:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 64b7f0e9f1c2a1b234567890
 *                       firstname:
 *                         type: string
 *                         example: John
 *                       email:
 *                         type: string
 *                         example: john@example.com
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: not found
 *       500:
 *         description: Internal server error
 */

router.post("/search",searchuser)

/**
 * @swagger
 * /api/updatuser/{id}:
 *   put:
 *     tags:
 *       - Update User
 *     summary: Update user by ID
 *     description: Update user details using MongoDB ObjectId
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *           example: 64b7f0e9f1c2a1b234567890
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               firstname: John
 *               email: john@example.com
 *     responses:
 *       201:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: user updae successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 64b7f0e9f1c2a1b234567890
 *                     firstname:
 *                       type: string
 *                       example: John
 *                     email:
 *                       type: string
 *                       example: john@example.com
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: user not found
 *       500:
 *         description: Internal server error
 */

router.put("/updatuser/:id",updatuser)

/**
 * @swagger
 * /api/updatepass:
 *   put:
 *     tags:
 *       - Update Password
 *     summary: Update user password
 *     description: Update user password using email, old password, and new password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - oldpass
 *               - newpass
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               oldpass:
 *                 type: string
 *                 example: OldPassword@123
 *               newpass:
 *                 type: string
 *                 example: NewPassword@123
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password updated successfully
 *       401:
 *         description: Incorrect old password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: password incoreect
 *       404:
 *         description: Email not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: email not found
 *       500:
 *         description: Internal server error
 */
router.put("/updatepass",updatepass)
// router.post("/searchproduct", searchProduct);
// router.put("/updateproduct/:id", updateProduct);


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
// router.post("/post/:id", post.single("image"), uploadpic);

/**
 * @swagger
 * /api/upload/{id}:
 *   post:
 *     tags:
 *       - Upload Docs
 *     summary: Upload user avatar image
 *     description: Upload and update user profile image
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *           example: 64b7f0e9f1c2a1b234567890
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - avatar
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: File uploaded successfully
 *                 avatar:
 *                   type: string
 *                   example: uploads/avatars/user123.png
 *       400:
 *         description: No file uploaded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No file uploaded
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Internal server error
 */

// router.post("/upload/:id",upload.single("avatar"),uploadimage)

router.post("/upload/:id",upload.array("avatar",5),uploadimage);  //array 


module.exports=router