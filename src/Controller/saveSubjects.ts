import { Request, Response } from 'express';
const Subject = require("../Model/Subject.model");
const User = require("../Model/User.model");
interface CustomRequest extends Request {
    payload?: any; // Define the payload property
  }
const saveSubject = async (req:CustomRequest, res:Response, next:any) => {
    console.log(req.payload.userId)
    const {subjectName, subjectCode, days, professorName} = req.body;
    
    try{
      const userId = req.payload.userId;
      console.log(userId)
      const user = await User.findById(userId);
      if (!user) {
        // If user is not found, return an appropriate error response
        return res.status(404).json({ error: "User not found" });
      }
      // If user is found, return the user object
      const subject = new Subject({subjectName, subjectCode, days, professorName});
      const savedSubject = await subject.save();
      user.subjects.push(savedSubject._id);
      await user.save();
      return res.send({subjects: savedSubject});

    }
    catch(err){
        next(err);
    }

}

export { saveSubject};