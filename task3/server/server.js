const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const port = 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log('Server is running');
});

app.get('/users', (req, res) => {
  fs.readFile('./task3/db/users.json', 'utf-8', (err, data) => {
    if(err) console.log("error: ", err);
    const users = JSON.parse(data);
    res.send(users);
  });
});

app.get('/users/:id', (req, res) => {
  let { id } = req.params;
  fs.readFile('./task3/db/users.json', 'utf-8', (err, data) => {
    if(err) console.log("error: ", err);
    const users = JSON.parse(data);
    const user = users.filter(user => user.id === id);
    res.send(user);
  });
});

app.post('/users', (req, res) => {
  let { user } = req.body;
  const id = uuidv4();
  user.id = id;
  const parseUser = JSON.stringify(user);
  fs.readFile('./task3/db/users.json', 'utf-8', (err, data) => {
    if(err) console.log("error", err);
    let users = JSON.parse(data);
    users.push(user);
    fs.writeFile('./task3/db/users.json', JSON.stringify(users), (err) => {
      if(err) throw err;
    });
    res.send(`User was successfully saved`);
  });
});

app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { user } = req.body;
  fs.readFile('./task3/db/users.json', 'utf-8', (err, data) => {
    if(err) console.log("error", err);
    let users = JSON.parse(data);
    users = users.map(existingUser =>
      existingUser.id === id ? { ...user, id } : existingUser
    );
    fs.writeFile('./task3/db/users.json', JSON.stringify(users), (err) => {
      if(err) throw err;
    });
    res.send(users);
  });
});

app.delete('/users', (req, res) => {
  fs.readFile('./task3/db/users.json', 'utf-8', (err, data) => {
    if(err) console.log("error", err);
    let users = [];  
    fs.writeFile('./task3/db/users.json', JSON.stringify(users), (err) => {
      if(err) throw err;
    });
    res.send(users);
  });
});

app.delete('/users/:id', (req, res) => {
  let { id } = req.params;
  fs.readFile('./task3/db/users.json', 'utf-8', (err, data) => {
    if(err) console.log("error", err);
    let users = JSON.parse(data);
    users = users.filter(user => user.id !== id);
    fs.writeFile('./task3/db/users.json', JSON.stringify(users), (err) => {
      if(err) throw err;
    });
    res.send(users);
  });
});