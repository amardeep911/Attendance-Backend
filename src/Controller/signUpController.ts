import { Request, Response } from 'express';
const User = require("../Model/User.model");
const createError = require("http-errors");
const { signAccessToken } = require("../helper/jwt_helper");
const signUpController = async (req:Request, res:Response, next:any) => {
   console.log(req.body)
   try{
      const {name, email, userId, userImage,} = req.body;
      if(!name || !email || !userId || !userImage){
         throw createError.BadRequest();
      }
      const doesExit = await User.findOne({email: email});
      if(doesExit){
         // return res.json({doesExit})
         const accessToken =  await signAccessToken(doesExit.id);
         return res.send({ accessToken, user: doesExit }); // Include user details in the response
         
      }
      const user = new User({name, email, userId, userImage});
      const savedUser = await user.save();
      const accessToken =  await signAccessToken(savedUser.id);
      return res.send({ accessToken, user: savedUser }); 

   }catch(err){
      next(err);
   }

}

export {signUpController};