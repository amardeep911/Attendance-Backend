import { Request, Response } from 'express';
const User = require("../Model/User.model");
const Subject = require("../Model/Subject.model");
const createError = require("http-errors");
const { signAccessToken } = require("../helper/jwt_helper");
const currentDate = new Date().toISOString();
console.log(currentDate);
interface CustomRequest extends Request {
    payload?: any; // Define the payload property
  }


const updateAttendance = async (req:CustomRequest, res:Response, next:any) => {
   console.log(req.body)
   const {subjectId, date, isPresent} = req.body;
   try{
    const userId = req.payload.userId;
    const user = await User.findById(userId);
    if (!user) {
        // If user is not found, return an appropriate error response
        return res.status(404).json({ error: "User not found" });
        }

    const subject = await Subject.findById(subjectId);
    
    if(subject.Attendence.length === 0){

        subject.Attendence.push({date, isPresent});
        await subject.save();
        return res.send({subjects: subject});
    }
    else{
        if (subject.Attendence.some((item: any) => {
            const itemDate = new Date(item.date);
            const currentDate = new Date(date);
            return itemDate.toISOString().split("T")[0] === currentDate.toISOString().split("T")[0];
         })) {
            try {
               const index = subject.Attendence.findIndex((item: any) => {
                  const itemDate = new Date(item.date);
                  const currentDate = new Date(date);
                  return itemDate.toISOString().split("T")[0] === currentDate.toISOString().split("T")[0];
               });
      
               subject.Attendence[index].isPresent = isPresent;
               await subject.save();
      
               return res.send({ subjects: subject });
            } catch (err) {
               next(err);
            }
         }
        else{
            subject.Attendence.push({date, isPresent});
            await subject.save();
            return res.send({subjects: subject});
        }
    }




   }catch(err){
      next(err);
   }

}

export {updateAttendance};