const express = require("express");
const BloomFilters = require("./BloomFilters");
const app = express();
const BloomFilter = new BloomFilters(10000, 0.05);
var fs = require("fs");

tests = [];
// for (let i = 0; i < 1000; i++) {
//   tests.push(String(i));
// }
// for (let word of tests) {
//   if (BloomFilter.check(word)) {
//     console.log("probable Yes for " + word);
//   } else {
//     console.log("confirm No for " + word);
//   }
// }

app.get("/", (req, res) => {
  return res.status(200).json({ status: "running" });
});

app.get("/check/:password", (req, res) => {
  let password = req.params.password;
  console.log(password);
  let result = BloomFilter.check(password);
  res.status(200).json({ word: password, isWeak: result });
});

app.listen(8000, () => {
  let weakpasswords = fs.readFileSync("passwords/weak10000.txt", "utf8");

  weakpasswords = weakpasswords.split("\n");
  for (let word of weakpasswords) {
    BloomFilter.add(word);
  }

  console.log("Server started");
});
