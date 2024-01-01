
const path = require('path');
const express = require('express');
const hbs = require('handlebars');
//? ===========================================================================================================
// ! Initializations 
const app = express();
const port = 8888;

//? ===========================================================================================================

// !Express INIT:)
const staticPath = path.join(__dirname,"/public");
app.use(express.static(staticPath));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//? ===========================================================================================================


//! [ The root Page ]
// ! [ I am Using Arrow Function ]

app.get("/",(req,res)=>{
 res.send("index.html");
})



//? ===========================================================================================================
// ! [ Lising to port ] 
app.listen(port,()=>{
    console.log("Running Now .....")
})