// !Required Packages
const express = require("express");


// ! Initializations 
app = express();
port = 8888;



//! [ The root Page ]
// ! [ I am Using Arrow Function ]

app.get("/",(req,res)=>{
res.send("hello World");
})


// ! [ Lising to port ] 
app.listen(port,()=>{
    console.log("Running Now .....")
})