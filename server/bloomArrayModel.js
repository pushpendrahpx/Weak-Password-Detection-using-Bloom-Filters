const mongoose = require("mongoose");

const arraySchema = mongoose.Schema({
  bitArray: {
    type: [String],
    default: [],
  },
});

const BloomArray = mongoose.model("BloomArray", arraySchema);

module.exports = BloomArray;
