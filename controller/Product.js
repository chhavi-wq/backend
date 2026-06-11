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

const updatePrice = async(req,res)=>{
    try{
        const {id,oldprice,newprice} = req.body;
        const user = await Usser.getByid({id});
        console.log(id);
        if(!user){
            return res.status(404).json({message:"price is not found"});
        }
       if(user.price!==oldprice){
        return res.status(400).json({message:"old price does not match"});
       }
        user.price=newprice;
        await user.save();

        res.status(200).json({message:"price updated successfully"});
    }
    catch{
        res.status(500).json({message:"internal server error"});
    }
}

module.exports = {Product, getallproducts, getbyidproduct, deleteproduct,searchProduct,updateProduct,updatePrice}

