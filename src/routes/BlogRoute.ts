const express =require("express");
const multer = require("multer");
const{checkBlogExists} =require("../controllers/BlogController")
const{updateSingleBlog, GetBlogs, CreateBlog,GetSingleBlog,UpdateSingleBlog, DeleteSingleBlog,}= require("../controllers/BlogController");

const router = express.Router()

router.post("/check", checkBlogExists);

router.post("/", CreateBlog );
router.get("/", GetBlogs );
router.get("/:id", GetSingleBlog);
router.put("/:id", UpdateSingleBlog);
router.delete("/:id", DeleteSingleBlog);







module.exports = router



