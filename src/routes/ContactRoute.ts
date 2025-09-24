const express =require("express");
const {CreateContact} = require("../controllers/ContactController")

const router = express.Router()
router.post("/", CreateContact );





module.exports = router
