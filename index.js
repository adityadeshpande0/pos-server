require("dotenv").config();
const express = require("express");
const cors = require("cors");
const DBConnect = require("./connections/db");
const appRoutes = require("./routes/appRoutes");

const app = express();

//CORS CONFIG
const corsConfigurations = {
  origin: process.env.CORS_ORIGIN,
  
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionSuccessStatus: 200,
  
};

app.use(cors(corsConfigurations));

app.options("*", cors(corsConfigurations));
  
//DATABASE CONNECTION
DBConnect();

app.use(express.json());
app.use("/respos/auth", appRoutes);

const serverPort = process.env.PORT;

app.listen(serverPort, () => console.log(`Server Running on : ${serverPort}`));