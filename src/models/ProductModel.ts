const mongoose = require ("mongoose")

const ProductSchema = mongoose.Schema(
{
    
//     sample: {

//     type:String,
//     required:[true, "Please this field is required"],
//     unique:true,
//     default:"chris"
//  }


// title is an example of a data field atructure
ProductName:{
    type:String,
    required:true
},


Size:{
    type:String,
    required:true
},


Price:{
    type:String,
    required:true
},

Category:{
    type:String,
    required:true

},


Desc:{
    type:String,
    required:true
},

BrandName:{
    type:String,
    required:true
},

Images:[
   {

      img:{
          type:String
        },

  }
    
],


// Image:{

//     type:String,
//     required:true
// },



},
 

{
 timestamps:true

}
    

        
    



)


module.exports=mongoose.model("Product", ProductSchema)