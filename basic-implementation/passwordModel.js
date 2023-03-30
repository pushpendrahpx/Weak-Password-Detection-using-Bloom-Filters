const mongoose = require("mongoose");

const passwordSchema = mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
  id: {
    type: String,
  },
});

const PasswordList = mongoose.model("PasswordList", passwordSchema);

module.exports = PasswordList;
