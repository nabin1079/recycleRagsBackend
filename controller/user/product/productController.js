const Product = require ("../../../model/productModel")
const product = require("../../../model/productModel")
const fs = require("fs")

exports.createProduct = async (req,res)=>{
    const file = req.file
    let filePath
    if (!file){
        filePath="https://www.pbtech.co.nz/imgprod/N/B/NBKASU3405119.jpg?h=1671387373"
    }else{
        filePath=req.file.filename
    }
    const{productName,productDescription,productPrice,productStatus,productStockQty}=req.body
    if(!productName||!productDescription||!productPrice||!productStatus||!productStockQty){
        return res.status(400).json({
            message: "please provide productName,productDescription,productPrice,productStatus,productStockQty"
        })
    }
    //insert into Product collection/table
    await Product.create({
productName,
productDescription,
productPrice,
productStatus,
productStockQty,
productImage : process.env.BACKEND_URL + filePath,
user:req.user.id
    })
    res.status(200).json({
        message:"product created successfully"
    })
}

exports.getProducts = async(req,res)=>{
    const products = await product.find()
    if (products.length ==0){
        res.status(400).json({
            message: "No product Found",
            data :[]
        })
    }else{
      res.status(200).json({
        message: "Products fetched successfully",
       data: products
      }) 
    }
}
exports.getproduct = async(req,res)=>{
    const {id}=req.params
    if(!id){
        return res.status(400).json({
            message : "please provide id(productId)"
        })
    }
    const product = await Product.find({_id : id})
    if(product.length==0){
        res.status(400).json({
            message:"No product found with that id",
            data:[]
        })
    }else{
        res.status(200).json({
            message:"Product fetched successfully",
            data: product
        })
    }
}




exports.deleteProduct =  async(req,res)=>{

    const {id} = req.params


// check if that user created that product

const userId = req.user.id
const product = await Product.findById(id)
const owner= product.user

// console.log(owner,userId,product)
if (owner!=userId){
    return res.status(400).json({
message: "you don't have permission"

    })
}

    

    
    
    if(!id){
        return res.status(400).json({
            message : "Please provide id"
        })
    }
  
    const oldData = await Product.findById(id)
    if(!oldData){
        return res.status(404).json({
            message : "No data found with that id"
        })
    }

    const oldProductImage = oldData.productImage // http://localhost:3000/image_available.png"
    const lengthToCut  = process.env.BACKEND_URL.length
    const finalFilePathAfterCut = oldProductImage.slice(lengthToCut) // image_available.png


 // REMOVE FILE FROM UPLOADS FOLDER
 fs.unlink("./uploads/" +  finalFilePathAfterCut,(err)=>{
    if(err){
        console.log("error deleting file",err) 
    }else{
        console.log("file deleted successfully")
    }
})

    await Product.findOneAndDelete(id)
    res.status(200).json({
        message: "Product deleted successfully"
    })
}




exports.editProduct = async(req,res)=>{

    const {id} = req.params 
      const {productName,productDescription,productPrice,productStatus,productStockQty} = req.body
      if(!productName || !productDescription || !productPrice || !productStatus || !productStockQty || !id){
        return res.status(400).json({
            message : "Please provide productName,productDescription,productPrice,productStatus,productStockQty,id"
        })
    }


    const oldData = await Product.findById(id)
    if(!oldData){
        return res.status(404).json({
            message : "No data found with that id"
        })
    }


    const oldProductImage = oldData.productImage // http://localhost:3000/image_available.png"
    const lengthToCut  = process.env.BACKEND_URL.length
    const finalFilePathAfterCut = oldProductImage.slice(lengthToCut) // image_available.png
    if(req.file && req.file.filename){
        // REMOVE FILE FROM UPLOADS FOLDER
            fs.unlink("./uploads/" +  finalFilePathAfterCut,(err)=>{
                if(err){
                    console.log("error deleting file",err) 
                }else{
                    console.log("file deleted successfully")
                }
            })
    }
   const datas =  await Product.findByIdAndUpdate(id,{
        productName ,
        productDescription ,
        productPrice,
        productStatus,
        productStockQty,
        productImage : req.file && req.file.filename ? process.env.BACKEND_URL +  req.file.filename :  oldProductImage
    },{
        new : true,
    
    })
    res.status(200).json({
        messagee : "Product updated successfully",
        data : datas
    })
}