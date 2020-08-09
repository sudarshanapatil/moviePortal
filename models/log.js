const ChangeLog = require('../schema/changeLogSchema');

module.exports.find = async function (username, password) {
    try {
        logs = await ChangeLog.find({})
        console.log(logs)
        return (logs)


    } catch (err) {
        console.error("Error :", err);
        throw new Error("User not found");
    }
} 
