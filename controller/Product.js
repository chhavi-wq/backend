const Usser=require("../model/Api")

const Product = async(req,res)=>{
    try{
        const {title,price,stock,description,id} = req.body;
        const product = new Usser({
            title,
            price,
            stock,
            description,
            id
        })
        if(!title || !price || !stock || !description || !id){
            return res.status(400).json({message:"all fields are required"});
        }
        const existingId = await Usser.findOne({id});
        if(existingId){
            return res.status(400).json({message:"id already exists"});
        }
        await product.save();

        res.status(201).json({message:"product created successfully"});
    }
    catch(err){
        res.status(500).json({message:"internal server error",err});
    }
}

const getallproducts = async(req,res)=>{
    try{
        const user = await Usser.find()
        res.status(200).json({message:"all products",user})
    }
    catch{
        res.status(500).json({message:"internal server error"});
    }
}

const getbyidproduct = async(req,res)=>{
    try{
        const productid = req.params.id
        const products = await Usser.findById(productid)
        if(!products){
            return res.status(404).json({message:"product not found"})
        }
        res.status(200).json({message:"product found",products})
    }
    catch{
        res.status(500).json({message:"internal server error"})
    }
}

const deleteproduct = async(req,res)=>{
    try{
        const productid = req.params.id
        const products = await Usser.findByIdAndDelete(productid)
        if(!products){
            return res.status(404).json({message:"product not found"})
        }
        res.status(200).json({message:"product deleted",products})
    }
    catch{
        return res.status(500).json({message:"internal server error"});
    }
}

const searchProduct=async(req,res)=>{
    try{
        const {query} = req.query
        const product = await Usser.find({
            $or:[
                {title:{$regex:query, $options:"i"}}
            ]
        })
        if(!product){
             return res.status(404).json({message:"product does not exist"})
        }
        res.status(200).json({message:"products found",product});
    }
    catch(err){
     return res.status(500).json({message:"internal server error",err});
    }
}

const updateProduct = async(req,res)=>{
    try{
        const productid= req.params.id;
        const Product = await Usser.findByIdAndUpdate(
            productid,
            req.body,
            {new:true}
        )
        if(!Product){
            return res.status(404).json({message:"product not found"});
        }
        res.status(200).json({message:"product updated",Product});

    }
    catch{
        return res.status(500).json({message:"internal server error"});
    }
}
const uploadpic = async(req,res)=>{
    try{
        const productid =  req.params.id;
        console.log("productid",productid)
        const product = await Usser.findById(productid);
        if(!product){
            return res.status(400).json({message:"product not found"});
        }
        if(!req.file){
            return res.status(400).json({message:"no file uploaded"});
        }
        product.image = req.file.path;
        await product.save();
        res.status(200).json({message:"image uploaded successfully",image:product.image});

    }
    catch(error){
        return res.status(500).json({message:error.message});
    }
}


module.exports = {Product, getallproducts, getbyidproduct, deleteproduct,searchProduct,updateProduct,uploadpic}

