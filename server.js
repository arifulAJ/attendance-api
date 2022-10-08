const express = require("express");
const connectionDB = require("./db");
const authenticate = require("./middleware/authenticate");
const routs = require("./routes/index");

const app = express();
app.use(express.json());
app.use(routs);
const PORT = process.env.PORT || 4000;

app.get("/privet", authenticate, async (req, res) => {
  return res.status(200).json({ message: "this is privet route" });
});
app.get("/public", (req, res) => {
  res.status(200).json({ message: "it is public route" });
});

app.get("/", (_req, res) => {
  res.send("Thanks for your request");
});

app.use((err, _req, res, _next) => {
  console.log(err);
  const message = err.message ? err.message : "server error occurred";
  const status = err.status ? err.status : 500;
  res.status(status).json({ message });
});
connectionDB("mongodb://localhost:27017/attendance-DB")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
