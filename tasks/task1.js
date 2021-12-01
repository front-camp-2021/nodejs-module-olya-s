const http = require('http');

const port = 5000;

const server = http.createServer((req, res) => {
  const url = req.url;
  if(url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');
    res.write('<h2>Greeting from server!</h1>');
    res.end();
  }
  if(url === '/data') {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');
    res.write('<p>Welcome to data path</p>');
    res.end();
  }
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});