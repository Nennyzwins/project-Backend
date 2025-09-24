const ProductModel = require("../models/ProductModel")
const cloudinary = require("../Utils/cloudinary")

const CreateProduct = async(req:any, res:any)=>{

    const {ProductName,Size,Price,Category,Desc,BrandName, Images,}= req.body
try{  
if (Images.length>5){
    return res.status(500).json({
        message: " Maximum file upload exceeded"
    })
}
const ProductExist = await ProductModel.findOne({ProductName})
if (ProductExist){
    return res.status(601).json({
        message:"product Name Already Exist"
    });
}

const uploadedImages = await Promise.all( Images.map(async (image:any) => { 
    
const result = await cloudinary.uploader.upload(image, { 
    file:Images,
    folder: "products", // Optional: store images in a specific folder in Cloudinary 
    resource_type: "image", }); 
    return { url: result.secure_url, }; }) );


//  create or posting  new product
const postNewProduct= new ProductModel({
    ProductName,Size,Price,Category,Desc,BrandName,
    Images:uploadedImages, 
})

await postNewProduct.save()
res.status(200).json(postNewProduct)


} catch(error){
 res.status(465).json({
    message: "Server error"
 })

}

};



// For images without an array




module.exports={
CreateProduct,
}