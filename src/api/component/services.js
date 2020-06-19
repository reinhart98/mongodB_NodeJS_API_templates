var mongoClient = require('mongodb');

class Mongohandlers{
    createdB = function(url,dbname,callback){
        var complete_url = url+dbname;
        var returnval;
        var msg;
        mongoClient.connect(complete_url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err,db){
            if(err){
                returnval = false;
                console.log(err);
                msg = err;
            }else{
                console.log("db created");
                returnval = true;
                msg = "db created";

            }
            db.close();
            callback({"returnval":returnval,"result":msg});
        });
    }
    createCollection = function(url,dbname,colname,callback) {
        var returnval;
        var msg;
        mongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true},function(err, db) {
            if(err){
                returnval = false;
                console.log(err);
                msg = err;
            }
            var dbo = db.db(dbname);
            dbo.createCollection(colname, function(err, res) {
                if(err){
                    returnval = false;
                    console.log(err);
                    msg = err;
                }else{
                    console.log("Collection created!");
                    returnval = true;
                    msg = "Collection created!";
                }
                db.close();
                callback({"returnval":returnval,"result":msg});
            });
          });
    }
    
    insertData = function (url,dbname,colname,item,callback) {
        var returnval;
        var msg;
        mongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true},function(err, db){
            if(err){
                returnval = false;
                console.log(err);
                msg = err;
            }
            var dbo = db.db(dbname);
            var datas = item;
            dbo.collection(colname).insertOne(datas,function (err,res) {
                if(err){
                    returnval = false;
                    Console.log(err);
                    msg = err;
                }else{
                    console.log("document inserted");
                    returnval = true;
                    msg = 'document inserted';
                }
                db.close();
                callback({"returnval":returnval,"result":msg});
            });
        });
        
    }

    queryFind = function(url, dbname, colname, jsonquery, callback) {
        var returnval;
        var msg;
        mongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true},function(err, db){
            if(err){
                returnval = false;
                console.log(err);
                msg = err;
            }
            var dbo = db.db(dbname);
            var query = jsonquery;
            dbo.collection(colname).find(query).toArray(function (err, result) {
                if(err){
                    returnval = false;
                    Console.log(err);
                    msg = err;
                }else{
                    console.log(result);
                    returnval = true;
                    msg = result;
                }
                db.close();  
                callback({"returnval":returnval,"result":msg});
            })
        });
    }

    getAll = function (url,dbname,colname, callback) {
        var returnval;
        var msg;
        mongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true},function(err, db){
            if(err){
                returnval = false;
                console.log(err);
                msg = err;
            }
            var dbo = db.db(dbname);
            
            dbo.collection(colname).find().toArray(function (err,result) {
                if(err){
                    returnval = false;
                    Console.log(err);
                    msg = err;
                }else{
                    console.log(result);
                    returnval = true;
                    msg = result
                }
                db.close();  
                callback({"returnval":returnval,"result":msg});  
            })
        });
    }

    deleteDocument = function (url,dbname,colname,addr,callback) {
        var returnval;
        var msg;
        mongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true},function(err, db){
            if(err){
                returnval = false;
                console.log(err);
                msg= err;
            }
            var dbo = db.db(dbname);
            var addrquery = addr;
            // need check document if exist 1st or it will alwyas true even if docs not there
            
            dbo.collection(colname).deleteOne(addrquery,function (err,obj) {
                if(err){
                    returnval = false;
                    msg = err;
                    console.log(err);
                }else if(obj.deletedCount == 0){
                    returnval = false;
                    msg = "no item to delete"
                }else{
                    msg = 'one document deleted';
                    returnval = true;
                }
                db.close();
                callback({"returnval":returnval,"result":msg});
                 
            })
        });
    }

    updateData = function (url, dbname, colname, addr, newdata, callback) {
        var returnval;
        var msg;
        mongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true},function(err, db){
            if(err){
                returnval = false;
                console.log(err);
                msg = err;
            }
            var dbo = db.db(dbname);
            var myquery = addr;
            var newvalues = { $set: newdata };
            dbo.collection(colname).updateOne(myquery,newvalues,function (err,res) {
                if(err){
                    returnval = false;
                    console.log(err);
                    msg = err;
                }
                else if(res.modifiedCount == 0){
                    msg = 'no data to modified'
                }
                else{
                    msg = 'one document updated';
                    returnval = true;
                }
                db.close();
                callback({"returnval":returnval,"result":msg}); 
            })
        });
    }
}

module.exports = {
    Mongohandlers:Mongohandlers
}