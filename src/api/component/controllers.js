"use strict";


class General{
    getCurrIp(){
        var interfaces = require('os').networkInterfaces();
        for (var devName in interfaces) {
            var iface = interfaces[devName];
            
            for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
                return alias.address;
            }
        }
    
        return '0.0.0.0';
    }

    getdatenow(){
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);

        // current month
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

        // current year
        let year = date_ob.getFullYear();

        // current hours
        let hours = date_ob.getHours();

        // current minutes
        let minutes = date_ob.getMinutes();

        // current seconds
        let seconds = date_ob.getSeconds();

        return date + "-" + month + "-" + year + " " + hours + ":" + minutes + ":" + seconds

    }

}

module.exports = {
    General:General
}







// class DynamoHandler{
//     addData = function(params1,params2, callback){
//         var returnVal;
//         var datas = {
//             TableName:tablewoorder,
//             Item: {
//                 "WOId":params1,
//                 "number":10,
//                 "WODatas":params2
//             }
//         }
//         docClient.put(datas, function(err, data){
//             // console.log(datas);
//             if(err){
//                 console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
//                 returnVal = false;
//             } else{
//                 console.log("Added item:", JSON.stringify(data, null, 2));
//                 returnVal = true;
//             }
//         callback(returnVal);
//         });    
//     }
// }

// export modules


