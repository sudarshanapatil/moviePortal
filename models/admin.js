const Admin = require('../schema/adminSchema');

module.exports.find = async function (username, password) {
  try {
    user = await Admin.findOne({ username: username, password: password })
    if (user) {
      return ({ username });
    } else {
      throw new Error("No such user");
    }
  } catch (err) {
    console.error("Error :", err);
    throw new Error("User not found");
  }
} 
