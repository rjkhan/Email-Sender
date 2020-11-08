
const fs = require('fs');
var express = require("express");
var app = express();
const cors = require('cors');
var morgan  = require('morgan')
const dotenv = require('dotenv').config();

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(cors());

const DB = require('./db/connection');
const db = new DB()


const senderData = [
  {id:1,first_name:"abc",last_name:"xyz",email:"omallinder0@statcounter.com",country:"france",gender:"Male",disease:"Hourman Virus"},
  {id:2,first_name:"Loud",last_name:"Teodora",email:"jlorie1@census.gov",country:"Germany",gender:"Male",disease:"Death Stench"},
  {id:3,first_name:"Ld",last_name:"Teod",email:"amacelholmg@admin.ch",country:"Germany",gender:"Femaale",disease:"Death Stench"}
];



// insert recipent
app.post('/server/add_recipients', async (req, res) => {
  debugger
  const data = req.body.data
  const con = db.create_connection()  
  let status = false;
  let result = [];
  let errLog= []
  let response = ""
  const sql = `INSERT INTO Person('first_name','last_name','email','country','gender','disease') VALUES(?,?,?,?,?,?)`
  for (let index = 0; index < data.length; index++) {
    let obj = data[index];
    let row = [obj.first_name,obj.last_name,obj.email,obj.country,obj.gender,obj.disease];
      
    try{
      response = await db.insert_into_db(sql,row,con);
      result.push(response.id)
    }
    catch(error){
      errLog.push(error)
    }
  }
  con.close()
  if(errLog.length>0)
    res.json({message:"Error",status:202})
  else
  res.json({message:"Data saved successfully",status:200,id:result})
  
});

// get recipient by id
app.get('/server/get_recipients/:id', async (req, res) => {
  debugger
  
  const con = db.create_connection()  
  let status = false;
  let result = [];
  let errLog= []
  let response = ""
  const sql = `SELECT * FROM person WHERE id = ?`;
  let row = [req.params.id];

  try{
    response = await db.getRecipentById(sql,row,con);
    result.push(response.person)
  }
  catch(error){
    errLog.push(error)
  }

  con.close()
  if(errLog.length>0)
    res.json({message:"Error",status:202})
  else
  res.json({message:"Data saved successfully",status:200,recipient:result})
  
});


// get all recipient 
app.get('/server/recipients', async (req, res) => {

  const con = db.create_connection()  
  let status = false;
  let result = [];
  let errLog= []
  let response = ""
  const sql = `SELECT * FROM person`;
  let row = [];

  try{
    response = await db.getAllRecipents(sql,row,con);
    result.push(response.person)
  }
  catch(error){
    errLog.push(error)
  }

  con.close()
  if(errLog.length>0)
    res.json({message:"Error",status:202})
  else
    res.json({message:"",status:200,recipient:result})
  
});

// delete recepient
app.delete('/server/delete/:id', async (req, res) => {
 
  const con = db.create_connection()  
  let status = false;
  let result = [];
  let errLog= []
  let response = ""
  const sql = `DELETE FROM person WHERE id = ?`;
  const params = req.params.id.split("&")
  var ids_ = params.map(x => parseInt(x));
  
  for (let index = 0; index < ids_.length; index++) {
    const element = parseInt(ids_[index]);
    try
    {
      response = await db.deleteRecipent(sql,[element],con);
      result.push(response.person)
    }
    catch(error){
      errLog.push(error)
    }    
  }
     
  
  con.close()
  if(errLog.length>0)
    res.json({message:"Error",status:202,error:errLog})
  else
    res.json({message:"Data saved Deleted",status:200,recipient:result})
  
});


// server listening
app.listen(4000, () => {
 console.log("Server running on port " + 4000);
});