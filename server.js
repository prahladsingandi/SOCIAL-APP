const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const dbConnection = require("./db");
const usersRoute = require("./routes/usersRoute");
const postRoute = require("./routes/postRoutes");
const path = require("path");
app.use(cors());
app.use(express.json({ limit: "25mb" }));

app.use("/api/users", usersRoute);
app.use("/api/posts", postRoute);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV == "production") {
  app.use("/", express.static("../client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
  });
}
app.listen(PORT, () => console.log(`Server is listening at post 5000 `));
