const path = require("path");
const express = require("express");
const hbs = require("hbs");
//? ===========================================================================================================
// ! Initializations
const app = express();
const port = 8888;

//? ===========================================================================================================

// !Express INIT:)
const staticPath = path.join(__dirname, "/public");
const partialsPath = path.join(__dirname, "/template/partials");



app.use(express.static(staticPath));

app.set("views", path.join(__dirname, "/template/views"));
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

//? ===========================================================================================================

//! [ The root Page ]
// ! [ I am Using Arrow Function ]

app.get("/", (req, res) => {
  res.render("bitonic/index");
});
app.get("/about", (req, res) => {
  res.render("bitonic/about");
});

app.get("/contact", (req, res) => {
  res.render("bitonic/contact");
});

app.get("/login", (req, res) => {
  res.render("bitonic/login");
});



//? ===========================================================================================================
// ! [ Teachers  ]
app.get("/teacher/teacherHomepage", (req, res) => {
  res.render("teacher/teacherHomepage");
});





//? ===========================================================================================================
// ! [ LOGINS  ]
app.get("/student/studentLogin", (req, res) => {
  res.render("student/studentLogin");
});

app.get("/teacher/teacherLogin", (req, res) => {
  res.render("teacher/teacherLogin");
});

app.get("/admin/adminLogin", (req, res) => {
  res.render("admin/adminLogin");
});

app.get("/sudoUser/sudoUserLogin", (req, res) => {
  res.render("sudoUser/sudoUserLogin");
});


//? ===========================================================================================================
// ! [Sudo User FIles :) ]
app.get("/sudoUser", (req, res) => {
  res.render("sudoUser/index");
});



//? ===========================================================================================================
// ! [ Lising to port ]
app.listen(port, () => {
  console.log("Running Now .....");
});
