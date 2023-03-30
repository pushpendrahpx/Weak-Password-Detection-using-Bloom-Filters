const express = require("express");
const BloomFilters = require("./BloomFilters");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const BloomFilter = new BloomFilters(10000, 0.05);
const PasswordList = require("./passwordModel");
const BloomArray = require("./bloomArrayModel");
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

app.get("/", async (req, res) => {
  // TO ADD PASSWORDS IN DB ---------------------------------
  // let weakpasswords = fs.readFileSync("passwords/weak10000.txt", "utf8");
  // weakpasswords = weakpasswords.split("\n");
  // let insertArray = [];
  // for (let word of weakpasswords) {
  //   const obj = {
  //     password: word,
  //   };
  //   insertArray.push(obj);
  // }
  // try {
  //   await PasswordList.insertMany(insertArray);
  // } catch (error) {
  //   res.status(409).json({ message: error.message });
  // }

  // TO INSERT BIT ARRAY IN DB ------------------------------
  // let insertArray = [
  //   {
  //     bitArray: BloomFilter.bitArray,
  //   },
  // ];
  // await BloomArray.insertMany(insertArray);

  return res.status(200).json({ status: "running" });
});

app.get("/check/:password", async (req, res) => {
  let password = req.params.password;
  console.log(password);
  let result = BloomFilter.check(password);

  // CHECK IF EXIST IN DB --------------------------
  if (result == true) {
    const ifExist = await PasswordList.findOne({ password });
    if (ifExist == null) {
      result = false;
    }
  }

  res.status(200).json({ word: password, isWeak: result });
});
const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, async () => {
      // let weakpasswords = fs.readFileSync("passwords/weak10000.txt", "utf8");
      // weakpasswords = weakpasswords.split("\n");
      // for (let word of weakpasswords) {
      //   BloomFilter.add(word);
      // }
      // GETTING BIT ARRAY FROM DB ----------------
      let bitArray = await BloomArray.findById("64255589dfef1d51f827038c");
      BloomFilter.bitArray = bitArray.bitArray;

      console.log("Server started");
    })
  )
  .catch((error) => console.log(error.message));
