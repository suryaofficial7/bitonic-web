const path = require("path");
const express = require("express");
const hbs = require("hbs");
const uuid = require("uuid");
const dotenv = require("dotenv");
const mysql = require("mysql");
const { conn } = require("./database/db");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
//? ===========================================================================================================
// ! Initializations
const app = express();
const port = 8888;

//? ===========================================================================================================

// !Express INIT:)
const staticPath = path.join(__dirname, "/public");
const partialsPath = path.join(__dirname, "/template/partials");

app.use(cookieParser());
app.use(express.static(staticPath));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
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
// ! [ Students :) ]
app.get("/student/studentHomepage", (req, res) => {
  let bitonicID = req.cookies["bitonicID"];

  if (bitonicID == null) {
    // res.send("bad");
    res.redirect("../../login");
  } else {
    res.render("student/studentHomepage");


    // res.redirect("student/d");
  }
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

app.get("/sudoUser", (req, res) => {
  res.render("sudoUser/sudoUserLogin");
});

//? ===========================================================================================================
// ! [ LOGOUTS :(  ]
app.get("/student/studentLogout", (req, res) => {
  res.render("student/studentLogout");
});

app.get("/teacher/teacherLogout", (req, res) => {
  res.render("teacher/teacherLogout");
});

app.get("/admin/adminLogout", (req, res) => {
  res.render("admin/adminLogout");
});
app.get("/sudoUser/sudoUserLogout", (req, res) => {
  res.render("sudoUser/sudoUserLogout");
});

//? ===========================================================================================================
// ! [SudoUser FIles :) ]
app.get("/sudoUser", (req, res) => {
  res.render("sudoUser/index");
});

//? ===========================================================================================================
// ! COMMON Routes :) ]
app.get("/common/signup", (req, res) => {
  res.render("common/signup");
});

//? ===========================================================================================================
// ! [ auth  ]

//?! ========================================================STUDENT AUTH0===============================
app.post("/auth/student", (req, res) => {
  const email = req.body.email;
  const pwd = req.body.pwd;

  conn.query(
    `select * from student where email='${email}' or username='${email}'`,
    async function (err, result1) {
      if (err) throw err;
      if (result1[0] == null) {
        console.log("No Accout Found!");
        res.render("student/studentLogin", { mess: "No accout Found !" });
      } else {
        let a = await bcrypt.compare(pwd, result1[0].pwd);
        console.log(a);

        if (a == false) {
          console.log("No Accout Found!");
          res.render("student/studentLogin", { mess: "Wrong  password!" });
        } else {
          console.log(result1);
          res.cookie("bitonicID", result1[0].bitonicID);
          res.redirect("../student/studentHomepage");
        }
      }
    }
  );
});







//? ===========================================================================================================
// ! [ Lising to port ]
app.listen(port, () => {
  console.log(`----------------------------------------------------`);

  console.log(`Running  in http://localhost:8888/`);
});
