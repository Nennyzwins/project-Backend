const mongoose = require ("mongoose")

const ContactSchema = mongoose.Schema(
{
    
//     sample: {

//     type:String,
//     required:[true, "Please this field is required"],
//     unique:true,
//     default:"chris"
//  }


// title is an example of a data field atructure
firstName:{
    type:String,
    required:true
},


lastName:{
    type:String,
    required:true
},


email: { 
    type: String, 
    required: true, 
    lowercase: true, 
    trim: true,
    unique: true,
   },
    
    

phoneNumber:{
    type:String,
    required:true

},

 role: {
      type: String,
      enum: ["volunteer", "member", "partner", "donor", "other"],
      required: true,
    },

    interests: {
      type: [String],
      enum: ["events", "community", "education", "advocacy"],
      default: [],
    },

    message: { type: String },

    consent: { type: Boolean, required: true },
  },
  { timestamps: true }
);

// Image:{

//     type:String,
//     required:true
// },
 

module.exports=mongoose.model("Contact", ContactSchema)