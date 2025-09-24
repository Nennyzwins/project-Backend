// const ContactModel = require("../models/ContactModel")
// const clouddinary = require("../Utils/cloudinary")

// const CreateContact = async(req:any, res:any)=>{

//     const {firstName,lastName,email,phoneNumber,role,interests, message,consent,}= req.body
// try{  

// const ContactExist = await ContactModel.findOne({email})
// if (ContactExist){
//     return res.status(601).json({
//         message:"User Already Exist"
//     });
// }

// // const uploadedImages = await Promise.all( Images.map(async (image:any) => { 
    
// // const result = await cloudinary.uploader.upload(image, { 
// //     file:Images,
// //     folder: "products", // Optional: store images in a specific folder in Cloudinary 
// //     resource_type: "image", }); 
// //     return { url: result.secure_url, }; }) );


// //  create or posting  new product
// const NewContact= new ContactModel({
//     firstName,lastName,email,phoneNumber,role,interests, message,consent 
// })

// await NewContact.save()
// res.status(200).json(NewContact)


// } catch(error){
//  res.status(465).json({
//     message: "Server error"
//  })

// }

// };



// // For images without an array




// module.exports={
// CreateContact,
// }

import { Request, Response } from "express";
const ContactModel = require("../models/ContactModel");

export const CreateContact = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phoneNumber, role, interests, message, consent } = req.body;

    if (!consent) {
      return res.status(400).json({ error: "Consent is required to join." });
    }

    const newEntry = new ContactModel({
      firstName,
      lastName,
      email,
      phoneNumber,
      role,
      interests,
      message,
      consent,
    });

    await newEntry.save();
    res.status(201).json(newEntry);

  } catch (err: any) {
      console.log("❌ Error in CreateContact:", err);
    if (err.code === 11000 && err.keyPattern?.email) {
      // duplicate email error
      return res.status(400).json({ error: "Email already exists" });
    }

    res.status(400).json({ error: err.message });
  }
};

// // GET: get all JoinUs entries
// export const getJoinUs = async (_req: Request, res: Response) => {
//   try {
//     const entries = await JoinUs.find().sort({ createdAt: -1 });
//     res.json(entries);
//   } catch (err: any) {
//     res.status(500).json({ error: err.message });
//   }
// };
