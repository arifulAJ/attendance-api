const error = require("../utils/error");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findUserByProperty, createNewUser } = require("./user");

const registerService = async ({
  name,
  email,
  password,
  roles,
  accountStatus,
}) => {
  let user = await findUserByProperty("email", email);

  if (user) throw error("user already exist ", 400);

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  return createNewUser({ name, email, password: hash, roles, accountStatus });
};
const loginService = async ({ email, password }) => {
  const user = await findUserByProperty("email", email);

  if (!user) throw error("invalid credential", 400);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw error("invalid credential", 400);
  // Todo/use case jwt
  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    password: user.password,
    roles: user.roles,
    accountStatus: user.accountStatus,
  };
  return jwt.sign(payload, "secret-key", { expiresIn: "2h" });
};

module.exports = {
  loginService,
  registerService,
};
