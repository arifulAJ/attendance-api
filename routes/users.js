const route = require("express").Router();
const userController = require("../controller/users");
/**
 * get user by id or email
 * @method GET
 */

route.get("/:userId", userController.getUserById);
/**
 * update user by id or email
 * @method put
 */
route.put("/:userId", userController.putUserById);
/**
 * update user by id or email
 * @method patch
 */
route.patch("/:userId", userController.patchUserById);
/**
 * delete user by id or email
 * @method delete
 */
route.delete("/:userId", userController.deleteUserById);

/**
 * get all user include
 * -filter
 * -sort
 * -pagination
 * -select property
 * @route /api/v1/users?sort={'by','name'}
 * @method GET
 * @visibility privet
 */
route.get("/", userController.getUser);

/**
 * create a new user
 */
route.post("/", userController.postUser);

module.exports = route;
