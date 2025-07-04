const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
const router = require("./router");
const ApiError = require("./utils/ApiError");
 const dotenv = require("dotenv");
// const pool = require("./config/db");

 dotenv.config({path: "./config/.env"});

const allowOrigins = [
  "http://localhost:3000", // for development
  "http://localhost:5173", // if needed
  "http://localhost:8080",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/", router);
app.get("/", (req, res) => {
  res.send("Hello from your Node.js server!");
});
app.use((req, res, next) => {
  next(new ApiError(404, "Not found"));
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});