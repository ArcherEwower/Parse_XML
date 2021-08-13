const express = require("express");
const mongoose = require("mongoose");
const api = require("./api");
const path = require("path");
const util = require("util");
const fs = require("fs");
const parser = new require("xml2js").Parser();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const startParse = (url) => {
  fs.readFile(url, (err, data) => {
    //чтение файла
    parser.parseString(data, function (err, result) {
      //xml > js object
      console.dir(util.inspect(result, false, null, true));
    });
  });
};
let url = path.join(__dirname, "notif_1.xml"); // путь к файлу
startParse("notif_1.xml"); // закуск парсинг xml
app.use("/api", api);
const start = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/atray", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    app.listen(8001, () => console.log("run"));
  } catch (e) {
    console.log(e);
  }
};
start();
