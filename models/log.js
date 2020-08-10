const ChangeLog = require('../schema/changeLogSchema');

module.exports.find = async function () {
    try {
        logs = await ChangeLog.find({}).sort({ "time": -1 }).limit(50);
        return (logs)
    } catch (err) {
        throw new Error("Data not found");
    }
} 
