// import { Router, Request, Response } from 'express';

// const admin: Router = Router();
var express = require('express')
var router = express.Router()

router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
  })

router.get('/', (req, res) => {
    res.send('Admin Route');
});

router.post('/login', (req, res) => {
    setTimeout(() => {
        if (req.session) { req.session.id = '4'; }
        res.json({
            name: 'Akshay',
            id: 4,
        });
    });
});

// export default admin;