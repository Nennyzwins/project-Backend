const mongoose = require ("mongoose")

const BlogSchema = mongoose.Schema(
{
    
//     sample: {

//     type:String,
//     required:[true, "Please this field is required"],
//     unique:true,
//     default:"chris"
//  }


// title is an example of a data field atructure
  title: {
      type: String,
      required: [true, "Title is required"],
     
    },


    content: {
      type: String,
      required: [true, "Content is required"],
    },
    
    author: {
      type: String,
      required: [true, "Author is required"],
    },



images:[
   {

      img:{
          type:String,
          required: true,
        },

  }
    
],



// Image:{

//     type:String,
//     required:true
// },
//  from chatgpt
// images: [
//       {
//         url: { type: String, required: true },
//       },
//     ],



},

 

{
 timestamps:true

},
    

        
    



);


module.exports=mongoose.model("Blog", BlogSchema)