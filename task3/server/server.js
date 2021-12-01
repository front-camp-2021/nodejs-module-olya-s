const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

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
    const user = users.find(user => user.id === +id);
    res.send(user);
  });
});

app.post('/users', (req, res) => {
  let { user } = req.body;
  fs.readFile('./task3/db/users.json', 'utf-8', (err, data) => {
    if(err) console.log("error", err);
    let users = JSON.parse(data);
    const maxId = users.reduce((acc, currentUser) => acc > currentUser.id ? acc : currentUser.id, 0);
    user.id = maxId + 1;
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
    const userIndex = users.findIndex(user => user.id === +id);
    if(userIndex !== -1) {
      users[userIndex] = { ...user, id: +id };
      fs.writeFile('./task3/db/users.json', JSON.stringify(users), (err) => {
        if(err) throw err;
      });
      res.send(users[userIndex]);
    }
    else {
      res.status(404).json({error: "User not found"});
    }
  });
});

app.delete('/users', (req, res) => {
  fs.readFile('./task3/db/users.json', 'utf-8', (err, data) => {
    if(err) console.log("error", err);
    let users = [];  
    fs.writeFile('./task3/db/users.json', JSON.stringify(users), (err) => {
      if(err) throw err;
    });
    res.status(204).json({status: "ok"});
  });
});

app.delete('/users/:id', (req, res) => {
  let { id } = req.params;
  fs.readFile('./task3/db/users.json', 'utf-8', (err, data) => {
    if(err) console.log("error", err);
    let users = JSON.parse(data);
    let userIndex = users.findIndex(user => user.id === +id);
    if(userIndex !== -1){
      users.splice(userIndex, 1);
      fs.writeFile('./task3/db/users.json', JSON.stringify(users), (err) => {
        if(err) throw err;
      });
      res.status(204).json({status: "ok"});
    }
    else {
      res.status(404).json({error: "User not found"});
    }
  });
});