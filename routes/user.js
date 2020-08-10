const express = require('express')
const router = express.Router()

const userModel = require('../models/movie');

router.post('/filter', async (req, res) => {
	let data = await userModel.filter(req.body);
	res.send(data);
});

module.exports = router;
