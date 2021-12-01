const express = require('express');
const app = express();
const fs = require('fs');

const port = 3000;

app.get('/', (req, res) => {
  res.send('Greeting from Server');
});

app.get('/data', (req, res) => {
  res.send('Here is some data');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

let numbers = '';
for(let i = 1; i <= 10; i++) {
  numbers = numbers + i + '\n';
}
fs.writeFile('./files/file.txt', numbers, (err) => {
  if(err) throw err;
});

fs.readFile('./files/file2.txt', 'utf-8', (err, data) => {
  if(err) throw err;
  console.log("DATA: ", data);
  fs.unlink('./files/file2.txt', (err) => {
    if(err) throw err;
  });
});