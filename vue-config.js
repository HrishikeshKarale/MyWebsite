// const fs = require("fs");

import * as fs from "fs";

module.exports = {
  devServer: {
    host: "10.0.1.3",
    port: 8085, // CHANGE YOUR PORT HERE!
    hotOnly: false,
    https: {
      key: fs.readFileSync("@/ssl/cert.key"),
      cert: fs.readFileSync("@/ssl/cert.pem")
    }
  }
};
