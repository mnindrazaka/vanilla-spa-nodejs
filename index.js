const http = require("http");
const fs = require("fs");

http
  .createServer(function (req, res) {
    fs.readFile("./public/" + req.url, function (err, data) {
      if (err == null) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(err.message);
        res.end();
      }
    });
  })
  .listen(8080);
