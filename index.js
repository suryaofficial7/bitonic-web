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
const Swal =  require('sweetalert2');
const fs = require('fs');
var nodemailer = require('nodemailer');
const cc = require('json2csv');
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,"/public/uploads"))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' +file.originalname )
  }
})

const upload = multer({ storage: storage })
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
 

  // fs.writeFile('domain.csv');

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

  
  const bitonicID = req.cookies.bitonicID;
  const studentID = req.cookies.studentID;

  conn.query(
    `select * from student where bitonicID='${bitonicID}' and studentID='${studentID}'`,
    async function (err, result1) {
      if (err) throw err;
      if (result1[0] == null) {
        console.log("No Accout Found!");
  res.render("bitonic/login");

      } else {
       
          res.redirect("../student/studentHomepage");
        }
      }
    
  );




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
              res.redirect("../../");
            }
            else{
            console.log("___________________________________1");
            console.log(result4);
            const graphData = [
              {
                jun: 10,
                jul: 20,
                aug: 30,
                sep: 40,
                oct: 50,
                nov: 60,
                dec: 70,
                jan: 80,
                feb: 90,
                mar: 100,
                apr: 110,
                may: 120,
                totallec:200,
                presentlec:120,
                absentlec:80
              }
              
            ];
            
        res.render("student/studentHomepage",{result4:result4[0],graphData:graphData[0]});
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
  let bitonicID = req.cookies["bitonicID"];
  let teacherID = req.cookies["teacherID"];

 
      if (bitonicID == null || teacherID==null) {
        // res.send("bad");
        res.redirect("../../login");
      } else {

        conn.query(
          `select * from teacher where bitonicID='${bitonicID}' and teacherID='${teacherID}'`,
          function (err4, result4) {


            if(result4[0]==null){
              res.redirect("../../");
            }
            else{
            console.log("___________________________________1");
            console.log(result4);
            const graphData = [
              {
                jun: 10,
                jul: 20,
                aug: 30,
                sep: 40,
                oct: 50,
                nov: 60,
                dec: 70,
                jan: 80,
                feb: 90,
                mar: 100,
                apr: 110,
                may: 120,
                totallec:200,
                presentlec:120,
                absentlec:80
              }
              
            ];

        res.render("teacher/teacherHomepage",{result4:result4[0], graphData:graphData[0]});
      }
      }
      );
        // res.redirect("teacher/d");
      }
});



app.get("/teacher/profile", (req, res) => {
  let bitonicID = req.cookies["bitonicID"];
  let teacherID = req.cookies["teacherID"];


  if (bitonicID == null || teacherID == null) {
    // res.send("bad");
    res.redirect("../../login");
  } else {
    res.render("teacher/profile");

    // res.redirect("student/d");
  }
});


app.get("/teacher/upload", (req, res) => {
  let bitonicID = req.cookies["bitonicID"];
  let teacherID = req.cookies["teacherID"];


  if (bitonicID == null || teacherID == null) {
    // res.send("bad");
    res.redirect("../../login");
  } else {
    res.render("teacher/upload");

    // res.redirect("student/d");
  }
});











//? ===========================================================================================================
// ! [ admins  ]
app.get("/admin/adminHomepage", (req, res) => {
  let bitonicID = req.cookies["bitonicID"];
  let adminID = req.cookies["adminID"];

 
      if (bitonicID == null || adminID==null) {
        // res.send("bad");
        res.redirect("../../login");
      } else {

        conn.query(
          `select * from admin where bitonicID='${bitonicID}' and adminID='${adminID}'`,
          function (err4, result4) {


            if(result4[0]==null){
              res.redirect("../../");
            }
            else{
            console.log("___________________________________1");
            console.log(result4);
            const graphData = [
              {
                jun: 10,
                jul: 20,
                aug: 30,
                sep: 40,
                oct: 50,
                nov: 60,
                dec: 70,
                jan: 80,
                feb: 90,
                mar: 100,
                apr: 110,
                may: 120,
                totallec:200,
                presentlec:120,
                absentlec:80
              }
              
            ];

        res.render("admin/adminHomepage",{result4:result4[0], graphData:graphData[0]});
      }
      }
      );
        // res.redirect("admin/d");
      }
});



app.get("/admin/teachers", (req, res) => {
  let bitonicID = req.cookies["bitonicID"];
  let adminID = req.cookies["adminID"];


  if (bitonicID == null || adminID == null) {
    // res.send("bad");
    res.redirect("../../login");
  } else {

conn.query(`select * from teacher`,function (err8 , result8, field ){

  if(err8){throw err8}
  else if(result8[0]==null){
  console.log(result8);

    res.render("admin/teacherData",{err:"No Data Found !!!!!!"});

  }
  else{

  conn.query(`select count(tid) as total from teacher `,function (err9 , result9, field2 ){
    if(err9) throw err9
    res.render("admin/teacherData",{result8:result8,total:result9[0]});

    // res.redirect("student/d");
  })
}
})


  }
});



app.get("/admin/students", (req, res) => {
  let bitonicID = req.cookies["bitonicID"];
  let adminID = req.cookies["adminID"];


  if (bitonicID == null || adminID == null) {
    // res.send("bad");
    res.redirect("../../login");
  } else {

conn.query(`select * from student`,function (err8 , result8, field ){

  if(err8){throw err8}
  else if(result8[0]==null){
    console.log("-------------------------------");
  console.log(result8);

    res.render("admin/studentData",{err:"No Data Found !!!!!!"});

  }
  else{
    console.log(result8);

  conn.query(`select count(sid) as total from student `,function (err9 , result9, field2 ){
    if(err9) throw err9
    res.render("admin/studentData",{result8:result8,total:result9[0]});

    // res.redirect("student/d");
  })
}
})
  }
});

app.get("/admin/requests", (req, res) => {
  let bitonicID = req.cookies["bitonicID"];
  let adminID = req.cookies["adminID"];


  if (bitonicID == null || adminID == null) {
    // res.send("bad");
    res.redirect("../../login");
  } else {

conn.query(`select * from queue`,function (err10 , result10, field ){

  if(err10){throw err10}
  else if(result10[0]==null){
  console.log(result10);

    res.render("admin/requests",{err:"No Data Found !!!!!!"});

  }
  else{


    res.render("admin/requests",{result10:result10});

    // res.redirect("student/d");

}
})


  }
});




app.get("/admin/addTeacher", (req, res) => {
  let bitonicID = req.cookies["bitonicID"];
  let adminID = req.cookies["adminID"];




  if (bitonicID == null || adminID == null) {
    // res.send("bad");
    res.redirect("../../login");
  } else {

    if(req.query.mes!=null){
      res.render("admin/addTeacher",{mes:"succes"});

  
    }else{

    res.render("admin/addTeacher");
  }
    // res.redirect("student/d");
  }
});





















//? ===========================================================================================================
// ! [ LOGINS  ]
app.get("/student/studentLogin", (req, res) => {

  const bitonicID = req.cookies.bitonicID;
  const studentID = req.cookies.studentID;

  conn.query(
    `select * from student where bitonicID='${bitonicID}' and studentID='${studentID}'`,
    async function (err, result1) {
      if (err) throw err;
      if (result1[0] == null) {
        console.log("No Accout Found!");
        res.render("student/studentLogin");
      } else {
       
          res.redirect("../student/studentHomepage");
        }
      }
    
  );
  
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
// ! [ DOWNLOADS : )
app.get("/admin/students/downloadData", (req, res) => {
  conn.query(`select * from student`, function (err13, res13, field13) {
    if (err13) {
      console.log(err13);
    } else {
      console.log(JSON.stringify(res13));
      const csvData = cc.parse(JSON.parse(JSON.stringify(res13)));
      console.log(csvData);
      fs.writeFile(
        path.join(__dirname, "Data/studentData.csv"),
        csvData,
        "utf8",
        function (err) {
          if (err) {
            console.log(
              "Some error occured - file either not saved or corrupted file saved."
            );
            console.log(err);
          } else {
            console.log("It's saved!");
            res.download(path.join(__dirname, "Data/studentData.csv"));
          }
        }
      );
    }
  });
});

app.get("/admin/teacher/downloadData", (req, res) => {
  conn.query(`select * from teacher`, function (err13, res13, field13) {
    if (err13) {
      console.log(err13);
    } else {
      console.log(JSON.stringify(res13));
      const csvData = cc.parse(JSON.parse(JSON.stringify(res13)));
      console.log(csvData);
      fs.writeFile(
        path.join(__dirname, "Data/teacherData.csv"),
        csvData,
        "utf8",
        function (err) {
          if (err) {
            console.log(
              "Some error occured - file either not saved or corrupted file saved."
            );
            console.log(err);
          } else {
            console.log("It's saved!");
            res.download(path.join(__dirname, "Data/teacherData.csv"));
          }
        }
      );
    }
  });
});















//? ===========================================================================================================
// ! [ LOGOUTS :(  ]
app.get("/student/logout", (req, res) => {
  res.clearCookie("bitonicID");
  res.clearCookie("studentID");

  res.redirect("../../?err=logged out succesfully");
});


app.get("/teacher/logout", (req, res) => {
  res.clearCookie("bitonicID");
  res.clearCookie("teacherID");

  res.redirect("../../?err=logged out succesfully");
});



app.get("/admin/Logout", (req, res) => {
  res.clearCookie("bitonicID");
  res.clearCookie("adminID");

  res.redirect("../../?err=logged out succesfully");
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
app.get("/bitonic/teacherLoginOption", (req, res) => {
  res.render("bitonic/teacherLoginOption");
});
app.get("/bitonic/studentLoginOption", (req, res) => {
  res.render("bitonic/studentLoginOption");
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
          var expiryDate = new Date(Number(new Date()) + 3153600000);
          res.cookie("bitonicID", result1[0].bitonicID,{maxAge:expiryDate});
          res.cookie("studentID", result1[0].studentID,{maxAge:expiryDate});

          res.redirect("../student/studentHomepage");
        }
      }
    }
  );


});

//?! ========================================================TEACHER AUTH0===============================
app.post("/auth/teacher", (req, res) => {
  const email2 = req.body.email;
  const pwd2 = req.body.pwd;

  conn.query(
    `select * from teacher where email='${email2}' or username='${email2}'`,
    async function (err, result6) {
      if (err) throw err;
      console.log(result6);

      if (result6[0] == null) {
        console.log("No Accout Found!");
        res.render("teacher/teacherLogin", { mess: "No accout Found !" });
      } else {
        let a = await bcrypt.compare(pwd2, result6[0].pwd);
        console.log(a);

        if (a == false) {
          console.log("No!");
          res.render("teacher/teacherLogin", { mess: "Wrong  password!" });
        } else {
          console.log(result6);
          res.cookie("bitonicID", result6[0].bitonicID);
          res.cookie("teacherID", result6[0].teacherID);

          res.redirect("../teacher/teacherHomepage");
        }
      }
    }
  );

  
});




//?! ========================================================admin AUTH0===============================
app.post("/auth/admin", (req, res) => {
  const email3 = req.body.email;
  const pwd3 = req.body.pwd;

  conn.query(
    `select * from admin where email='${email3}' or username='${email3}'`,
    async function (err, result7) {
      if (err) throw err;
      console.log(result7);

      if (result7[0] == null) {
        console.log("No Accout Found!");
        res.render("admin/adminLogin", { mess: "No accout Found !" });
      } else {
        let a = await bcrypt.compare(pwd3, result7[0].pwd);
        console.log(a);

        if (a == false) {
          console.log("No!");
          res.render("admin/adminLogin", { mess: "Wrong  password!" });
        } else {
          console.log(result7);
          res.cookie("bitonicID", result7[0].bitonicID);
          res.cookie("adminID", result7[0].adminID);

          res.redirect("../admin/adminHomepage");
        }
      }
    }
  );


});






// !{ SIGN UP AUTH0}
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
// ! [ Insert Teachers ]
app.post("/insert/addTeacher",upload.single('avatar') , async  (req,res)=>{
  console.log("============================");

  const p = await bcrypt.hash("123",10);
  const bID = "bitonic@tea-"+uuid.v4().substring(0,15);
conn.query(`INSERT INTO teacher (tid, bitonicID, teacherName, username, email, pwd, qualification, dob, img, teacherID, teacherOf, mob, workingAt, posting, section) VALUES (NULL, '${bID}', '${req.body.teacherName}', '${req.body.username}', '${req.body.email}', '${p}', '${req.body.qualification}', '${req.body.dob}', '${"/uploads/"+req.file.filename}', '${bID.substring(0,16)}', '7', '${req.body.mobileNumber}', '${req.body.workingAt}', '${req.body.posting}', '${req.body.section}');`, (err15,res15,field)=>{



res.redirect("../admin/addTeacher?mes=success")

})


})









//? ===========================================================================================================
// ! [ Lising to port ]
app.listen(port,  async () => {
  console.log(`----------------------------------------------------`);
  const aa = await bcrypt.hash("1234567",10);
  console.log(aa);


  console.log(`Running  in http://localhost:8888/`);
});



