import userModel from "../src/models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try{
    const { fullname, email, password } = req.body;

  const existingUser = await userModel.findOne({ email });

  if (existingUser) {
    return res.status(400).json({
      message: "User already exist with this email",
      success: false,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    fullname,
    email,
    password: hashedPassword,
  });
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1h",
    },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User Siggned up",
    success: true,
    user,
  });

  }catch(error){
     res.status(500).json({
      message: "Internal server error",
      success: false,
      error,
    });

  }
};

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "user not found",
        success: false,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Incorrect Password",
        success: false,
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      },
    );

    res.cookie("token", token);

    res.status(200).json({
      message: "user logged in successfully",
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error,
    });
  }
};

export const LogoutUser = (req,res)=>{
    try{
        res.clearCookie("token");
        res.status(200).json({
            message:"User Logged out successfully",
            success:true
        })

    }
    catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error,
    });
  }
}

export const getMe = async(req,res)=>{
    try{
        const user = req.user;
        if(!user){
            return res.status(404).json({
                message:"user not found",
                success:false
            })
        }
        res.status(200).json({
            message:"user fetched successfully",
            success:true,
            user
        });

    }
    catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error,
    });
  }
}
export const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};