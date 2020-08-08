const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const Movie = require('../models/movie');
const Base64 = require('../util/base64');

const tokenSecret = "movieportal";

router.get('/getall', verifyToken, logData, async function (req, res) {
  let data = await Movie.getAll();
  res.send(data);
});

router.post('/add', verifyToken, logData, async function (req, res) {
  let data = await Movie.add(req.body);
  res.send(data);
});

router.post('/update', verifyToken, logData, async function (req, res) {
  res.send({message: "Update API"});
});

router.post('/delete', verifyToken, logData, async function (req, res) {
  res.send({message: "Delete API"});
});

router.post('/login', async (req, res) => {
  try {
    let { username, password } = req.body;
    password = Base64.encode(password);
    await Movie.find({username, password})
    jwt.sign({user}, tokenSecret, {expiresIn: "24h"}, function (err, token) {
      if (err) {
        res.json({
          message: "Error in authentication"
        });
      } else {
        res.json({
          token,
        });
      }
    });
  } catch(err) {
    res.sendStatus(401);
  }
});

// Verify token
function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== undefined) {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, tokenSecret, function (err, data) {
      if (err) {
        res.sendStatus(403);
      } else {
        req.user = data.user.username;
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
}

// Log data
function logData(req, res, next) {
  console.log(req.url, Date.now, req.user);
  next();
}

module.exports = router;