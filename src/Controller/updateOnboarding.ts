import { Request, Response } from 'express';
const User = require("../Model/User.model");
const createError = require("http-errors");

interface CustomRequest extends Request {
    payload?: any; // Define the payload property
  }
const updateOnboarding = async (req:CustomRequest, res:Response, next:any) => {
    try{
        const userId = req.payload.userId;
    
        const user = await User.findById(userId);
        if (!user) {
          // If user is not found, return an appropriate error response
          return res.status(404).json({ error: "User not found" });
        }
        // If user is found, return the user object
        user.onBoardingCompleted = true;
        user.department= req.body.department;
        user.semester= req.body.semester;

        const updatedUser = await user.save();
        res.json({ updatedUser });
      }
      catch(err){
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
      }

}

export {updateOnboarding};