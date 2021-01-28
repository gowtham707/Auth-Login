//import the modules
//use require() function to import all the modules
const express=require("express");
const mongodb=require("mongodb");
const cors= require("cors");
const bodyparser=require("body-parser");
const jwt=require("jwt-simple");

//create the rest service object
let app=express();

//enable the cors policy
app.use(cors());

//set the "json" MIME Type
app.use(bodyparser.json());

//parse the json data (client data)
app.use(bodyparser.urlencoded({extended:false}));

//create the variable to store server token 
let server_token='';

//create the Ref to connect to MongoDB Database
let ashokIT=mongodb.MongoClient;

//create the post request
app.post("/login",(req,res) =>
{
    ashokIT.connect("mongodb+srv://admin:admin@cluster0.abahc.mongodb.net/ecommerce?retryWrites=true&w=majority",(err,conn) =>
    {
        if(err) throw err;
        else{
            let db=conn.db("ecommerce");
            db.collection("login_details").find({"uname":req.body.uname,"upwd":req.body.upwd}).toArray((err,arr) =>
            {
                if(err) throw err;
                else{
                    if(arr.length>0)
                    {
                        res.status(200).json({login:"success"});
                    }
                    else
                    {
                        res.status(200).json({login:"fail"});
                    }
                }

            });
        }
    });
});

//assign the custom port no
let port =process.env.PORT || 8080;
app.listen(port,() =>
    {
        console.log("server started successfully 123sdf");
    })