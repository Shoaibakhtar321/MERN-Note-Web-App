const app = require("./src/app");
require("dotenv").config();
const connectDB = require("./src/db/db");
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Sever is running at port 3000");
});
