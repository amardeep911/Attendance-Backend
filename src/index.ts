import express, { Request, Response } from "express";
import { authRoute } from "./Routes/AuthRoutes";
import { userRoute } from "./Routes/UserRoute";

import dotenv from "dotenv";
const User = require("./Model/User.model");
const {verifyAccessToken} = require('./helper/jwt_helper');
require('./helper/init_mongodb');

dotenv.config();
const app = express();
const cors = require("cors");
const morgon = require("morgan");
const bodyParser = require("body-parser");
const createError = require("http-errors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgon("dev"));

app.use("/auth", authRoute);
app.use("/user",verifyAccessToken ,userRoute)

interface CustomRequest extends Request {
  payload?: any; // Define the payload property
}

app.get("/",verifyAccessToken,async(req: CustomRequest, res: Response) => {

  try{
    const userId = req.payload.userId;

    const user = await User.findById(userId);
    if (!user) {
      // If user is not found, return an appropriate error response
      return res.status(404).json({ error: "User not found" });
    }
    // If user is found, return the user object
    res.json({ user });
  }
  catch(err){
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.use(async (req: Request, res: Response, next) => {
  // const error:any = new Error("Route not found");
  // error.status = 404;
  next(createError.NotFound('Route not found'));
});


app.use((error: any, req: Request, res: Response, next: any) => {
  res.status(error.status || 500);
  res.json({
    error: {
      status: error.status || 500,
      message: error.message,
    },
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
