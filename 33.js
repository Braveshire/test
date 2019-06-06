var http = require("http");
var fs = require("fs");
var url = require("url");

var server = http.createServer(function(req,res){
    var pathname = url.parse(req.url).pathname;
        fs.readFile("./src/project"+pathname,function(err,data){
            if(err){
                res.write("404");
            }else{
                res.write(data);
            }
            res.end();
        });
});
server.listen(3000);