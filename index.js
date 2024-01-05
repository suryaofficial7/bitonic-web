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
const alert = require("alert");
const notifier = require("node-notifier");
const { fork } = require("child_process");
//? ===========================================================================================================
// ! Initializations
const app = express();
const port = 8888;

//? ===========================================================================================================

// !Express INIT:)
const staticPath = path.join(__dirname, "/public");
const partialsPath = path.join(__dirname, "/template/partials");
// app.use(express.urlencoded()); // Parse URL-encoded bodies using query-string library
// or
// app.use(express.urlencoded({ extended: true }));
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
// window.print();

//! [ The root Page ]
// ! [ I am Using Arrow Function ]

app.get("/", (req, res) => {

  let err = req.query.err;
  let mess = req.query.mess;
  let succ = req.query.succ;
if(err || mess || succ != null){
  res.render("bitonic/index",{data:"yes",err:err,mess:mess,succ:succ});
}
else{
  res.render("bitonic/index");

}
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
// ! [ STUDENTS :) ]
app.get("/student/studentHomepage", (req, res) => {
  let bitonicID = req.cookies["bitonicID"];
  let studentID = req.cookies["studentID"];

 
      if (bitonicID == null || studentID==null) {
        // res.send("bad");
        res.redirect("../../login");
      } else {

        conn.query(
          `select * from student where bitonicID='${bitonicID}' and studentID='${studentID}'`,
          function (err4, result4) {


            if(result4[0]==null){
              res.redirect("../../?err=xjv");
            }
            else{
            console.log("___________________________________1");
            console.log(result4);

        res.render("student/studentHomepage",{result4:result4});
      }
      }
      );
        // res.redirect("student/d");
      }
    
});

app.get("/student/profile", (req, res) => {
  let bitonicID = req.cookies["bitonicID"];

  if (bitonicID == null) {
    // res.send("bad");
    res.redirect("../../login");
  } else {
    res.render("student/studentProfile");

    // res.redirect("student/d");
  }
});

app.get("/student/upload", (req, res) => {
  let bitonicID = req.cookies["bitonicID"];

  if (bitonicID == null) {
    // res.send("bad");
    res.redirect("../../login");
  } else {
    res.render("student/files");

    // res.redirect("student/d");
  }
});

app.get("/student/notification", (req, res) => {
  let bitonicID = req.cookies["bitonicID"];

  if (bitonicID == null) {
    // res.send("bad");
    res.redirect("../../login");
  } else {
    res.render("student/etc");

    // res.redirect("student/d");
  }
});

app.get("/student/report", (req, res) => {
  let bitonicID = req.cookies["bitonicID"];

  if (bitonicID == null) {
    // res.send("bad");
    res.redirect("../../login");
  } else {
    res.render("student/studentData");

    // res.redirect("student/d");
  }
});

app.get("/student/sms", (req, res) => {
  let bitonicID = req.cookies["bitonicID"];

  if (bitonicID == null) {
    // res.send("bad");
    res.redirect("../../login");
  } else {
    res.render("student/studentSms");

    // res.redirect("student/d");
  }
});

app.get("/student/activate", (req, res) => {
  let bitonicID = req.cookies["bitonicID"];

  if (bitonicID == null) {
    // res.send("bad");
    res.redirect("../../login");
  } else {
    res.render("student/activate");

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
  if (req.cookies.bitonicID == null) {
    res.render("student/studentLogin");
  } else {
    res.redirect("/student/studentHomepage");
  }
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
app.get("/student/logout", (req, res) => {
  res.clearCookie("bitonicID");
  res.redirect("../../");
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
          res.cookie("studentID", result1[0].studentID);

          res.redirect("../student/studentHomepage");
        }
      }
    }
  );
});

app.get("/auth/signup", (req, res) => {
  const val = req.query;
  const name = req.query.fullName;
  const email = req.query.email;
  const mob = req.query.mob;
  const userType = req.query.userType;
  const queueID = uuid.v4().substring(0, 7);

  conn.query(
    `select email from queue where email='${email}'`,
    (err3, result3) => {
      if (result3[0] == null) {
        conn.query(
          `insert into queue(name,email,contact,userType,timey,queueID) values('${name}','${email}','${mob}','student',CURRENT_TIMESTAMP,'${queueID}')`,
          (err2, result2) => {
            if (err2) {
              console.log("error in inserting Queue ID");
              console.log(err2);
            } else {
              console.log("Entered successfully >>>");
              // console.log(val);

              res.render("common/signup", {
                succ: "Application Submitted Successfully",
              });
            }
          }
        );
      } else {
        res.render("common/signup", { mess: "Email Allready Exist*" });
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
