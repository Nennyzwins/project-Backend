const BlogModel = require("../models/BlogModel");
// ✅ Create new blog
const CreateBlog = async (req:any, res:any) => {
  try {
    const { title, content, author, images } = req.body;

    // check if blog with same title exists
    const existingBlog = await BlogModel.findOne({ title });
    if (existingBlog) {
      return res.status(400).json({ message: "Blog with this title already exists" });
    }
    
  const newBlog = new BlogModel({
      title,
      content,
      author,
      images: req.body.images, // Cloudinary URLs passed from frontend
    });
   
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    console.error("🔥 Blog creation failed:", error);
    res.status(500).json({ message: "Error creating blog", error })
  }
};


const checkBlogExists = async (req:any, res: any) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: "title is required" });

    const existingBlog = await BlogModel.findOne({ title });
    return res.json({ exists: !!existingBlog });
  } catch (err) {
    console.error("checkBlogExists error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};


// ✅ Get all blogs
const GetBlogs = async (req: any, res: any) => {
  try {
    // Read query params for page and limit
    const page = parseInt(req.query.page) || 1; // default page 1
    const limit = parseInt(req.query.limit) || 5; // default 5 blogs per page
    const skip = (page - 1) * limit;

    const totalBlogs = await BlogModel.countDocuments();
    const blogs = await BlogModel.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      blogs,
      totalPages: Math.ceil(totalBlogs / limit),
      currentPage: page,
      totalBlogs,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blogs", error });
  }
};

// ✅ Get single blog
const GetSingleBlog = async (req:any, res:any) => {
  try {
    const blog = await BlogModel.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blog", error });
  }
};

// ✅ Delete blog
const DeleteSingleBlog = async (req:any, res:any) => {
  try {
    const blog = await BlogModel.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete blog", error });
  }
};

// ✅ Update blog

const UpdateSingleBlog = async (req: any, res: any) => {
  try {
    const { title, content, author, image } = req.body; 
    const blog = await BlogModel.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (title) blog.title = title;
    if (content) blog.content = content;
    if (author) blog.author = author;

    // ✅ overwrite the first image with new Cloudinary URL
    if (image) {
      blog.images = [{ img: image }];
    }

    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Failed to update blog", error });
  }
};


module.exports = {
  CreateBlog,
  GetBlogs,
  GetSingleBlog,
  DeleteSingleBlog,
  UpdateSingleBlog,
  checkBlogExists,
};