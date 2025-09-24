import { blue } from "colors"
const bodyParser = require("body-parser");
const express =  require("express")
const dotenv = require ("dotenv").config ()

const colors = require ("colors")
const  ConnectDB = require("./Config/db");
const Port = process.env.PORT || 2001
const app = express();
const BlogRoute=require("./routes/BlogRoute")
const ContactRoute = require("./routes/ContactRoute")
const cors = require("cors")



// app.use(bodyParser.json());


app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));



app.use("/api/Blog", BlogRoute)
app.use("/api/Contact", ContactRoute)



ConnectDB();

app.listen (Port,()=>
    console.log(`Server running on port: http://localhost:${Port}`.bgGreen));
// app.listen(()=>console.log(`"Server running on ${Port}`.bgYellow));