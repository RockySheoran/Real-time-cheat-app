import { userModel } from "../Models/userModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

export const userRegister = async (req, res) => {
    try {
        // console.log("vee")
        const { fullName, userName, email, password, confirmPassword, gender } = req.body;
      // console.log(fullName, userName, email, password, confirmPassword, gender)
        if (!fullName || !userName || !email || !password || !confirmPassword || !gender) {
          return  res.status(400).json({
                message: "all filed is required!",
                success: false
            })
        }
        if (password !== confirmPassword) {
          return res.status(400).json({
            message: "Password not match",
            success: false,
          })
        }
        const user = await userModel.findOne({ userName })
        if (user) {
          return res.status(400).json({
            message: "User already exit try different",
            success: false,
          })
        }
        const boy = `https://avatar.iran.liara.run/public/boy?username=${userName}`
        const female = `https://avatar.iran.liara.run/public/girl?username=${userName}`


        const hashPassword = await bcrypt.hash(password, 10)
        await userModel.create({
            fullName, userName, email, password: hashPassword, gender, profilePhoto: gender === "Male" ? boy : female,
        })

       return res.status(201).json({
         message: "Registration successfully ",
         success: true,
       })
    }
    catch (e) {
        console.log(e);

       return res.status(500).json({
         message: "Registration not successfully",
         success: true,
       })
    }
}


export const userLogin = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        if(!userName && !email){
          return res.status(404).json({
            message: "Please Enter one of UserName or Email",
            success: false,
          })
        }
        if(userName){

         var  userNameCheck = await userModel.findOne({ userName });
        }
        if(email){
          
          var userEmailCheck = await userModel.findOne({ email });
        }
      if (!userNameCheck && userName) {
          return res.status(404).json({
            message: "Incorrect user and Password",
            success: false,
          })
        }
      if (!userEmailCheck && email) {
          return res.status(404).json({
            message: "Incorrect user and Password",
            success: false,
          })
        }
        const user =  userNameCheck ? userNameCheck : userEmailCheck
       
        const pass = await bcrypt.compare(password, user.password);

        if (!pass) {
         return res.status(400).json({
           message: "Incorrect user and Password ",
           success: false,
         })
        }
        const tokenId = { userId: user._id };
        const secretKey = process.env.JWT_SECRET_KEY;
        if (!secretKey) {
            throw new Error("JWT_SECRET_KEY is not defined in the environment variables");
        }

        // Generate JWT token
        const token = jwt.sign(tokenId, secretKey, { expiresIn: "1d" });
        const newUser = {
            id:user._id,
            fullName: user.fullName,
            userName: user.userName,
            profilePhoto: user.profilePhoto,
        }

       return res
         .status(200)
         .cookie("token", token, {
           maxAge: 1 * 24 * 60 * 60 * 1000,
           httpOnly: true,
           sameSite: "strict",
         })
         .json({
           message: "Login successfully",
           success: true,
           newUser,
         })

    } catch (error) {
        console.log(error);

       return res.status(500).json({
         message: "Login not successfully",
         success: false,
       })
    }
}
export const userLogout = async (req, res) => {
    try {
       return res.status(200).cookie("token", "", { maxAge: 0 }).json({
         message: "Logout Successfully",
         success: true,
       })

    } catch (error) {
        console.log(error);
      return res.status(500).json({
        message: "LogOut  not successfully",
        success: true,
      })
    }
}

export const otherUser = async (req, res) => {
    try {
        const userLoginUserId = req.id;
        const otherUser = await userModel.find({ _id: { $ne: userLoginUserId } }).select("-password")
        return res.json({
            otherUser
        })
    } catch (error) {
        console.log(error)
    }
}