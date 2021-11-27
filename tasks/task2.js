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

fs.writeFile('./files/file.txt', '', (err) => {
  if(err) throw err;
});

fs.readFile('./files/file.txt', 'utf-8', (err, data) => {
  if(err) throw err;
  for(let i = 1; i <= 10; i++){
    fs.appendFile('./files/file.txt', i + '\n', (err) => {
      if(err) throw err;
    });
  }
});

// const text = 'Some text for file to be read and deleted';
// fs.writeFile('./files/file2.txt', text, (err) => {
//   if(err) throw err;
// })

fs.readFile('./files/file2.txt', 'utf-8', (err, data) => {
  if(err) throw err;
  console.log("DATA: ", data);
  fs.unlink('./files/file2.txt', (err) => {
    if(err) throw err;
  });
});