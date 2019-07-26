var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
cors = require("cors");

// const pg = require('pg');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'postgres-instance.cmk6lwar8w8s.us-east-2.rds.amazonaws.com',
  database: 'homeBook',
  password: 'postgree',
  port: 5432,
})

// DECLARE JWT-secret
const JWT_Secret = 'key';

router.all('*', cors());

/* GET home page. */
router.get('/api/homeBook',(req, res) => {
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    client.query('SELECT * FROM note;', (err, result) => {
      release()
      if (err) {
        return console.error('Error executing query', err.stack)
      }
      return res.json(result.rows);
    })
  });
});

router.post('/api/addRecords', (req, res) => {
  var user = req.body;
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    client.query('INSERT INTO note(comment,name) VALUES($1,$2)', [user.comment, user.name], (err, result) => {
      release()
      if (err) {
        return console.error('Error executing query', err.stack)
      }
    })
  })
});


router.post('/api/registration', (req, res) => {
  var user = req.body;
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    client.query('INSERT INTO users(name,password) VALUES($1,$2)', [user.name, user.password], (err, result) => {
      release()
      if (err) {
        res.status(403).send({
          errorMessage: 'Please provide name and password'
        });
      }
      var token = jwt.sign(user, JWT_Secret);
      res.status(200).send({
        signedUser: user.name,
        token: token
      });
    });
  })
});

router.post('/api/authorization', (req, res) => {
  var user = req.body;
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    client.query('SELECT name,password FROM users WHERE name = $1', [user.name], (err, result) => {
      release()
      if (err) {
        return console.error('Error executing query', err.stack)
      }
      var checkUser = result.rows[0];
      try {
        if (checkUser.name === user.name && checkUser.password === user.password) {
          var token = jwt.sign(user, JWT_Secret);
          res.status(200).send({
            signedUser: user.name,
            token: token
          });
        } else {
          res.status(403).send({
            errorMessage: 'Authorisation required!'
          });
        }
      }
      catch {
        res.status(403).send({
          errorMessage: 'Please provide name and password'
        });
      }
    })
  })
});

module.exports = router;
