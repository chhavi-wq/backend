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
    catch{
        res.status(500).json({message:"internal server error"});
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

module.exports = {Product, getallproducts, getbyidproduct, deleteproduct}

