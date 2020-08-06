
var express = require('express')
var router = express.Router()

const userModel = require('../models/user');
console.log(userModel, "user")

router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})

router.get('/getall', async (req, res) => {
    let data = await userModel.getAll();
    res.send(data);
});

router.post('/filter', async (req, res) => {
    let data
    if (req.body.searchText)
        data = await userModel.search(req.body.searchText);
    else if (req.body.sort)
        data = await userModel.sort(req.body.sort);
    else
        data = await userModel.sort(req.body.filter);
    res.send(data);
});

module.exports = router;