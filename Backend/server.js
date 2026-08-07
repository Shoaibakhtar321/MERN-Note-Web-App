const app = require("./src/app");
const connectDB = require("./src/db/db");
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

connectDB();

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(3000, () => {
  console.log("Sever is running at port 3000");
});
