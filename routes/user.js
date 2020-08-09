const express = require('express')
const router = express.Router()

const userModel = require('../models/movie');
console.log("in movies routes" ,userModel)



// router.use((req, res, next) => {
// 	console.log('Time: ', Date.now());
// 	next();
// })

// router.get('/getall', async (req, res) => {
// 	let data = await userModel.getAll();
// 	res.send(data);
// });

router.post('/filter', async (req, res) => {
	let data = await userModel.filter(req.body);
	res.send(data);
});

module.exports = router;