const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const changeLogSchema = new Schema({
    username: { type: String, required: true },
    apiUrl: { type: String, required: true },
    time: { type: Date, required: true }
});

const ChangeLog = mongoose.model('changeLogs', changeLogSchema);

module.exports = ChangeLog;
