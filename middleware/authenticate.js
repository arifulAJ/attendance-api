const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function authenticate(req, res, next) {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Unauthorize" });
    }
    token = token.split(" ")[1];

    const decode = jwt.verify(token, "secret-key");
    const user = await User.findById(decode._id);
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: "Unauthorize" });
    }

    req.user = user;
    next();
  } catch {
    return res.status(400).json({ message: "invalid token is he" });
  }
}
module.exports = authenticate;
