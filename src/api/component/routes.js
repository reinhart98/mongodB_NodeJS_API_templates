"use strict";

const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const objconn = require('./controllers.js');
const dbHandlers = require('./services.js')
var objhandler = new objconn.General();
var objmongo = new dbHandlers.Mongohandlers();

// var objdynamo = new objconn.DynamoHandler();

// app.set("view engine", "pug");
// app.set("views", path.join(__dirname, "views"));

app.get('/',(req,res) =>{
    // res.render("index");
    var item = {
        "API":"ROOT",
        "list_routes":{
            "createdB":"/api/createdB",
            "create_collection":"/api/createCollection"
        }
    }
    res.send(JSON.stringify(item));
})

app.post('/api/createCollection', (req,res)=>{
    var datas = req.body;
    var urldb = datas.url;
    var dbname = datas.dbname;
    var colname = datas.collname;
    objmongo.createCollection(urldb,dbname, colname,function(result){
        if(result.returnval){
            return res.send(JSON.stringify({"status":"SUCCESS","content":result.result}));
        }else{
            return res.send(JSON.stringify({"status":"FAILED","content":result.result}));
        }
    });
});

app.post('/api/createdB', (req,res)=>{
    var datas = req.body;
    var urldb = datas.url;
    var dbname = datas.dbname;
    objmongo.createdB(urldb,dbname,function(result){
        if(result.returnval){
            return res.send(JSON.stringify({"status":"SUCCESS","content":result.result}));
        }else{
            return res.send(JSON.stringify({"status":"FAILED","content":result.result}));
        }
    });
});

app.post('/api/insertData', (req,res)=>{
    var json = req.body;
    var urldb = json.url;
    var dbname = json.dbname;
    var collname = json.collname;
    var item = json.item;
    objmongo.insertData(urldb,dbname,collname,item,function(result) {
        if(result.returnval){
            return res.send(JSON.stringify({"status":"SUCCESS","content":result.result}));
        }else{
            return res.send(JSON.stringify({"status":"FAILED","content":result.result}));
        }
    });
});

app.post('/api/queryfind', (req,res)=>{
    var json = req.body;
    var urldb = json.url;
    var dbname = json.dbname;
    var collname = json.collname;
    var find = json.query;
    objmongo.queryFind(urldb,dbname,collname,find,function(result) {
        if(result.returnval){
            return res.send(JSON.stringify({"status":"SUCCESS","content":result.result}));
        }else{
            return res.send(JSON.stringify({"status":"FAILED","content":result.result}));
        }
    });
});

app.post('/api/getData', (req,res)=>{
    var json = req.body;
    var urldb = json.url;
    var dbname = json.dbname;
    var collname = json.collname;
    objmongo.getAll(urldb,dbname,collname,function(result) {
        console.log(result);
        if(result.returnval){
            return res.send(JSON.stringify({"status":"SUCCESS","content":result.result}));
        }else{
            return res.send(JSON.stringify({"status":"FAILED","content":result.result}));
        }
    });
});

app.post('/api/deleteDocument', (req,res)=>{
    var json = req.body;
    var urldb = json.url;
    var dbname = json.dbname;
    var collname = json.collname;
    var addrquery = json.query;
    objmongo.deleteDocument(urldb,dbname,collname,addrquery,function(result) {
        // console.log(result);
        if(result.returnval){
            return res.send(JSON.stringify({"status":"SUCCESS","content":result.result}));
        }else{
            return res.send(JSON.stringify({"status":"FAILED","content":result.result}));
        }
    });
});

app.post('/api/updateDocument', (req,res)=>{
    var json = req.body;
    var urldb = json.url;
    var dbname = json.dbname;
    var collname = json.collname;
    var addrquery = json.query;
    var newdata = json.newdata;
    objmongo.updateData(urldb,dbname,collname,addrquery,newdata,function(result) {
       
        if(result.returnval){
            return res.send(JSON.stringify({"status":"SUCCESS","content":result.result}));
        }else{
            return res.send(JSON.stringify({"status":"FAILED","content":result.result}));
        }
    });
});


class Run{
    appsrun(){
        app.use("/", router);
        app.listen(3000,objhandler.getCurrIp(),() =>{
        console.log('Server started on '+objhandler.getCurrIp()+':3000');
    });
    }
}


module.exports = {
    Server:Run
};