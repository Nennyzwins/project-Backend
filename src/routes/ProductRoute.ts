const express =require("express");
const {CreateProduct} = require("../controllers/ProductController")

const router = express.Router()
router.post("/", CreateProduct );





module.exports = router

