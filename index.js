const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');
const cors = require('cors');

var app = express();
console.log('tejas');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'abdatabase'
})

connection.connect(function(error){
    if(error){
        console.log(error)
    }
    else{
        console.log('Mysql connected...');
    }
})

//////////// create tables /////////////////////
/////user table///////
let userdetails = `CREATE TABLE IF NOT EXISTS usertable(
    user_id varchar(50) PRIMARY KEY,
    name varchar(20) NOT NULL,
    gender varchar(20) NOT NULL,
    age int(11) NOT NULL,
    maritalStatus tinyint(1) NOT NULL,
    child tinyint(1),
    kids int(11), 
    profession varchar(30) NOT NULL
    )`;

    connection.query(userdetails, function(err, results, fields) {
        if (err) {
            console.log(err);
            
        }
        else{
         console.log("1st table created");   
        }
});

//////goals table/////////
let goals = `CREATE TABLE IF NOT EXISTS goaltbl(
    goal_id int(11) PRIMARY KEY ,
    goals varchar(30) NOT NULL
)`

    connection.query(goals, function(err,results, fields){
        if(err){
            console.log(err);
        }
        else{
            console.log("2nd table created")
        }
    })

///////// user goals tables//////
let usergoals = `CREATE TABLE IF NOT EXISTS usergoalstable(
    usergoal_id int(11) PRIMARY KEY,
    goals varchar(50) NOT NULL,
    goal_id int(11),
    user_id varchar(50),
    FOREIGN KEY(goal_id) REFERENCES goaltbl(goal_id),
    FOREIGN KEY(user_id) REFERENCES usertable(user_id)
)`
connection.query(usergoals, function(err,results, fields){
    if(err){
        console.log(err);
    }
    else{
        console.log("3nd table created")
    }
})

/////////// anser table/////////
let answersgoal = `CREATE TABLE IF NOT EXISTS anstable(
    ans_id int(11) PRIMARY KEY AUTO_INCREMENT,
    user_id varchar(50) ,
    goal_id int(11) ,
    answer1 int(11) NOT NULL,
    answer2 int(11) NOT NULL,
    answer3 int(11) NOT NULL,
    answer4 int(11) NOT NULL,
    answer5 int(11) NOT NULL,
    answer6 int(11) NOT NULL,
    FOREIGN KEY(user_id) REFERENCES usertable(user_id),
    FOREIGN KEY(goal_id) REFERENCES goaltbl(goal_id)
    )`
connection.query(answersgoal, function(err,results, fields){
    if(err){
        console.log(err);
    }
    else{
        console.log("4nd table created")
    }
})

//////////// create tables /////////////////////

///////  store user details and send uuid ///////////////
app.post("/details",function(req,res){
    console.log(req.body);
    let uid = uuidv4();
    let obj = [
        uuidv4(),
        req.body.name,
        req.body.gender,
        req.body.age,
        req.body.maritalStatus,
        req.body.child,
        req.body.kids,
        req.body.profession
        ]
    // console.log(obj);
    connection.query("INSERT INTO usertable(user_id,name,gender,age,maritalStatus,child,kids,profession) VALUES (?)",[obj],function(error,rows,field){
        if(error){
            // console.log(error);
            // throw(error);
            throw(error)
        }
        else{
            // console.log(row[0].user_id);
            console.log(uid);
            res.send({userid:uid});
        }
    })
    // connection.end();    
})
///////  store user details and send uuid ///////////////

///////// get goals ////////////////////
app.get("/getgoals",function(req,res){
    connection.query("SELECT * FROM goaltbl",function(err,rows){
        // console.log(rows);
        if(err){
            throw(err);
            // console.log(err)
        }
        else{
            res.send({data:rows});
            // console.log(data);
        }
        // connection.end();    
    })
})
///////// get goals ////////////////////

////////// strore goals ///////////////
    // let ugoal = [
    //     [1,"Retirement"],
    //     [2,"Holiday"],
    //     [3,"Honeymoon"],
    //     [4,"Marriage"],
    //     [5,"Car"],
    //     [6,"Bike"],
    //     [7,"Luxury Car"],
    //     [8,"Starting Business"],
    //     [9,"Self Development"],
    //     [10,"Child’s Education"],
    //     [11,"Child’s Marriage"],
    //     [12,"World Tour"],
    //     [13,"Wealth Creation"],
    //     [14,"Follow Passion"],
    //     [15,"Philanthropy"],
    // ]
    // connection.query("INSERT INTO goaltbl(goal_id,goals) Values ?",[ugoal],function(error,rows,field){
    //     if(error){
            // throw(error);
    //     }
    //     else{
    //         // res.send(rows);
    //         console.log(rows);
    //     }
    // })

////////// strore goals ///////////////

////////// strore user goals //////////////////////
app.post("/usergoals",function(req,res){
    console.log(req.body);
    let userid = req.body.user_id;
    // console.log(userid);
    let user_goal = req.body.selectedgoals;
    // console.log(user_goal);
    let sqldata = [];
    for(let i = 0; i< 4; i++){
        let add = [user_goal[i].goal,user_goal[i].goal_id,userid];
        // console.log("=",add);
        sqldata.push(add);
    }
    // console.log("=>",sqldata);
    connection.query("INSERT INTO usergoalstable(goals,goal_id,user_id) VALUES ?",[sqldata],function(error,rows,field){
        if(error){
            throw(error);
        }
        else{
            // console.log({userid:uid});
            // console.log(rows);
            res.send({userid:uid});
        }
            connection.end();
        })
})
////////// strore user goals //////////////////////

///////////// get user goals filter by uuid /////////////////////
app.get("/getusergoal/:id",function(req,res){
    // console.log(req.params.id);
    let urid = req.params.id;
    connection.query(`SELECT * FROM usergoalstable WHERE user_id = ?`,[urid],function(err,rows){
        if(err){
            throw(err);
        }
        else{
            res.send(rows);
        }
        connection.end();
    })
})
///////////// get user goals filter by uuid /////////////////////

/////////////store user answers //////////////////////
app.post("/goalsanswer",function(req,res){
    console.log(req.body);
    let userid = req.body.user_id;
    // console.log("userid",userid);
    let dtails_goal = req.body.goal_details;
    // console.log("detailgoal",dtails_goal);
    let ansdata = [];
    for(let i = 0; i< 4; i++){
            let answers1 = req.body.goal_details[i].answer[0].answer1;
            // console.log(answers1);
            let answers2 = req.body.goal_details[i].answer[0].answer2;
            // console.log(answers2);
            let answers3 = req.body.goal_details[i].answer[0].answer3;
            // console.log(answers3);
            let answers4 = req.body.goal_details[i].answer[0].answer4;
            // console.log(answers4);
            let answers5 = req.body.goal_details[i].answer[0].answer5;
            // console.log(answers5);
            let answers6 = req.body.goal_details[i].answer[0].answer6;
            // console.log(answers6);
        let data = [userid,dtails_goal[i].goal_id,answers1,answers2,answers3,answers4,answers5,answers6];
        console.log(data);
        ansdata.push(data);
    }
    connection.query("INSERT INTO anstable(user_id,goal_id,answer1,answer2,answer3,answer4,answer5,answer6) VALUES ?",[ansdata],function(error,rows,field){
        if(error){
            throw(error);
        }
        else{
            // console.log({userid:uid});
            res.send({userid:uid});
        }
            connection.end();
    })
})
/////////////store user answers //////////////////////

///////////// get answers /////////////////
app.get("/getanswers/:id",function(req,res){
    // console.log(req.params.id);
    let urid = req.params.id;
    connection.query(`SELECT * FROM anstable WHERE user_id = ?`,[urid],function(err,rows){
        if(err){
            throw(err);
        }
        else{
            res.send({result:rows});
        }
        connection.end();
    })
})
//////////// get answers //////////////////

app.listen(3000);
