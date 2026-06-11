const User=require("../model/model")
const bcrypt=require("bcrypt")
const nodemailer=require("nodemailer")
const path=require("path")

const transporter=nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:465,
    secure:true,
    auth:{
        user:"abc@gmail.com",
        pass:"voii ptlv cmsb yuih" 
    }

})

const generateotp=()=>{
    let digits="0123456789"
    let OTP=""
    for(let i=0;i<4;i++){
        OTP+=digits[Math.floor(Math.random()*10)]
    }
    return OTP
}

const Creates=async(req,res)=>{
    try{
        const {firstname,email,mobile,country,password}=req.body;
        const user=await User.findOne({email})
        if(user){
            return res.status(400).json({message:"email already exist"})
        }
        if(!firstname || !email || !mobile || !country || !password){
            return res.status(401).json({message:"All feild required"})
        }
        const hashpass=await bcrypt.hash(password,10)
const newuser=new User({
    firstname,email,mobile,country,password:hashpass

})
await newuser.save()
res.status(201).json({message:"user creaete successfully",newuser})

    }
    catch{
         res.status(500).json({message:"internal server error"})
    }

}

const login =async(req,res)=>{
    try{
        const {firstname,password}=req.body
        const user=await User.findOne({firstname})
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        if(user.password != password){
            return res.status(400).json({message:"password incorrect"})
        }
        res.status(200).json({message:"login sucessfully"})

    }
    catch{
         res.status(500).json({message:"internal server error"})
    }
}

const loginwitheemail =async(req,res)=>{
    try{
        const {email,password}=req.body
        const user=await User.findOne({email})
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        const comparepassword=await bcrypt.compare(password,user.password)
        if(!comparepassword){
            return res.status(400).json({message:"password incorrect"})
        }
        res.status(200).json({message:"login sucessfully"})

    }
    catch{
         res.status(500).json({message:"internal server error"})
    }
}

const loginwithOtp=async(req,res)=>{
    try{
const {email,password}=req.body;
if(!email || !password){
   return  res.status(401).json({message:"feilds are required"})
}
const user=await User.findOne({email})
if(!user){
  return   res.status(404).json({message:"email Not Found"})
}
const compare=await bcrypt.compare(password,user.password)
if(!compare){
  return   res.status(401).json({message:"password incorrect"})
}

const otp=generateotp()
user.otp=otp
await user.save()

const sendmail={
    from:"test@gmail.com",
    to:user.email,
    subject:"OTP VERIFICATION",
    text:`your OTP is ${otp}`

}

await transporter.sendMail(sendmail)

return res.status(200).json({message:"OTP sent Successfully"})
    }
    catch{
         res.status(500).json({message:"internal server error"})
    }
}
const verify=async(req,res)=>{
    try{
        const {email,otp}=req.body;
        const user=await User.findOne({email})
if(!user){
  return   res.status(404).json({message:"email Not Found"})
}
    if (user.otp !== otp) {
      return res.status(401).json({ message: "Invalid OTP" });
    }
  user.otp = null;
  await user.save ()
res.status(200).json({message:"login sucessfully"})
    }
    catch{
         res.status(500).json({message:"internal server error"})
    }
}


const getall=async(req,res)=>{
    try{
        const use=await User.find()
        res.status(200).json({message:"all  user",use})

    }
    catch{
          res.status(500).json({message:"internal server error"})
    }
}
const getbyid=async(req,res)=>{
    try{
        const userid=req.params.id
        const user=await User.findById(userid)
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        res.status(200).json({message:"user found",user})

    }
     catch{
          res.status(500).json({message:"internal server error"})
    }
}

const deleteuser=async(req,res)=>{
    try{
        const userid=req.params.id
        const user=await User.findByIdAndDelete(userid)
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        res.status(200).json({message:"user deleted",user})

    }
     catch{
          res.status(500).json({message:"internal server error"})
    }
}
const searchuser=async(req,res)=>{
    try{
        const {query}=req.query
        const user=await User.find({
            $or:[
           {firstname:{$regex:query , $options:"i"}},
           {email :{$regex:query , $options:"i"}}
            ]
    })
        if(!user){
            res.status(404).json({message:"not foud"})
        }
        res.status(200).json({message:"user data ",user})

    }
     catch{
          res.status(500).json({message:"internal server error"})
    }

}


const updatuser=async(req,res)=>{
    try{
const userid=req.params.id
const user=await User.findByIdAndUpdate(
    userid,
    req.body,
    {new:true}
)
if(!user){
    return res.status(404).json({message:"user not found"})
}
res.status(201).json({message:"user updae successfully",user})
    }
     catch{
          res.status(500).json({message:"internal server error"})
    }
}

const updatepass=async(req,res)=>{
    try{
        const {email,oldpass,newpass}=req.body;
        const user=await User.findOne({email})
        if(!user){
            res.status(404).json({message:"email not found"})
        }
        const compare=await bcrypt.compare(oldpass,user.password)
        if(!compare){
            res.status(401).json({message:"password incoreect"})
        }
         const hashedPassword = await bcrypt.hash(newpass, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
     

    }
    catch{
        res.status(500).json({message:"internal server error"})
    }
}

// const uploadimage=async(req,res)=>{
//     try{
//         const userid=req.params.id
//         const user=await User.findById(userid)
//         if(!user){
//             res.status(404).json({message:"not found"})
//         }
//         if(!req.file){
//             res.status(401).json({message:"file  not upload"})
//         }
//         user.avatar=req.file.originalname
//             await user.save();

//         res.status(200).json({message:"file upload sccessfully"})

//     }
//     catch{
//         res.status(500).json({message:"internal server error"})
//     }
// }

const uploadimage = async (req, res) => {
    try {
        const userid = req.params.id;

        const user = await User.findById(userid);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded"
            });
        }

        // Save only file path or filename
        user.avatar = req.file.path; 
        await user.save();

        return res.status(200).json({
            message: "File uploaded successfully",
            avatar: user.avatar
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};




module.exports={Creates,login,updatuser,loginwitheemail,loginwithOtp,verify ,uploadimage,getall,getbyid,deleteuser,searchuser,updatepass}