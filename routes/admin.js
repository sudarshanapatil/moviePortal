const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const Movie = require('../models/movie');
const Logs = require('../models/log');
const Base64 = require('../util/base64');
const ChangeLog = require('../schema/changeLogSchema')
const tokenSecret = "movieportal";

router.get('/getall', verifyToken, logData, async function (req, res) {
  let data = await Movie.getAll();
  res.send({ code: 200, data });
});

router.get('/getlogs', verifyToken, logData, async function (req, res) {
  let data = await Logs.find();
  res.send({ code: 200, data });
});

router.post('/add', verifyToken, logData, async function (req, res) {
  try {
    let data = await Movie.add(req.body);
    res.send({ code: 200, data });
  } catch (error) {
    res.send({ code: 400, error });
  }
});

router.post('/update', verifyToken, logData, async function (req, res) {
  try {
    await Movie.edit(req.body);
    res.send({ code: 200, message: "Update API" });
  } catch (error) {
    res.send({ code: 400, error });
  }
});

router.post('/delete', verifyToken, logData, async function (req, res) {
  await Movie.remove(req.body.id);
  res.send({ code: 200, message: "Delete API" });
});

router.post('/login', async (req, res) => {
  try {
    let { username, password } = req.body;
    password = Base64.encode(password);
    let user = await Admin.find(username, password)
    jwt.sign({ user }, tokenSecret, { expiresIn: "24h" }, function (err, token) {
      if (err) {
        res.json({
          message: "Error in authentication"
        });
      } else {
        res.json({
          code: 200,
          token,
        });
      }
    });
  } catch (err) {
    res.sendStatus(401);
  }
});

// Verify token
function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
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
    res.sendStatus(405);
  }
}

// Log data
function logData(req, res, next) {
  console.log(req.url, Date.now, req.user);
  if (req.url !== '/getlogs') {
    let log = ChangeLog({ username: req.user, time: Date.now(), apiUrl: req.url });
    log.save();
  }
  next();
}

module.exports = router;