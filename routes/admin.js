
var express = require('express')
var router = express.Router()
const adminModel = require('../models/admin');

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

router.get('/getall', async (req, res) => {
    let data = await adminModel.getAll();
    res.send(data);
});

router.post('/add', async (req, res) => {
    console.log(req.body, "in api");
    let data = await adminModel.add(req.body);
    res.send(data);
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

module.exports = router;