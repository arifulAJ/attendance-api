const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 15,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
          v
        );
      },
      message: (props) => `invalid email: ${props.value}`,
    },
  },
  password: {
    type: String,
    minlength: [6, "password too short"],
    required: true,
    // maxlength: [40, "password is too big"],
  },
  roles: {
    type: [String],
    required: true,
    default: ["STUDENT"],
  },
  accountStatus: {
    type: String,
    enum: ["PENDING", "ACTIVE", "REJECTED"],
    default: "PENDING",
    required: true,
  },
});

const User = model("User", userSchema);

module.exports = User;
