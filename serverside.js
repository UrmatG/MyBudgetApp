var http = require('http');
var dt = require('./mytestmodule');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("Aichurok is my wife. The date and time are currently: " + dt.myDateTime());
  res.end();
}).listen(8080);