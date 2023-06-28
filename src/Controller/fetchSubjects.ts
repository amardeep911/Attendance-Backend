import { Request, Response } from "express";
const Subject = require("../Model/Subject.model");
const User = require("../Model/User.model");
interface CustomRequest extends Request {
  payload?: any; // Define the payload property
}
const fetchSubject = async (req: CustomRequest, res: Response, next: any) => {
    console.log(req.payload.userId);
  try {
    const userId = req.payload.userId;

    const user = await User.findById(userId);

    if (!user) {
        // If user is not found, return an appropriate error response
        return res.status(404).json({ error: "User not found" });
        }
   const subjetsArray = user.subjects;
    const subjects = await Subject.find({ _id: { $in: subjetsArray } });
    res.json({ subjects });

  } catch (err) {
    next(err);
  }
};

export { fetchSubject };
