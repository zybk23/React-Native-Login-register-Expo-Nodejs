const express=require("express");
const dotenv=require("dotenv");
const cors=require("cors");
const bodyParser=require("body-parser");
const router=require("./routers/user");
const connectDatabase=require("./database/connectDatabase");
const customErrorHandler=require("./Error/customErrorHandler");


const app=express();

dotenv.config({
    path:"./config/env/config.env"
});

connectDatabase();

const PORT=process.env.PORT;
const ip="192.168.56.1";

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended:false
}));

app.use("/api",router);

app.use(customErrorHandler);

app.listen(PORT,ip,()=>{
    console.log("Listening to "+ip+":"+PORT);
});
