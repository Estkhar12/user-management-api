import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const registerUser = async (req, res, next) => {
    const { email, name, password, phone } = req.body;
    try {
        const profileImagePath = req.files?.profileImg[0]?.path;
        const profile =await uploadOnCloudinary(profileImagePath)
        const hashPassword = await bcrypt.hash(password, 12);
      const newUser = new User({
        name,
        email,
        phone,
        profileImg : profile.secure_url,
        password: hashPassword,
      });
      const savedUser = await newUser.save();
      return res.status(201).json({
        status: "success",
        data: savedUser,
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        return res.status(401).json({
          message: "Email or Password is Wrong!",
        });
      }
      const user = await User.findOne({ email });
      const passwordValid = await bcrypt.compare(password, user.password);
      if (!passwordValid) {
        return res.status(401).json({
          message: "Email or Password is Wrong!",
        });
      }
      const token = jwt.sign({ userId: user._id }, process.env.jwtToken);
      res.status(200).json({
        message: "user LogedIn",
        data: user,
        accessToken: token,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  };


  
export const protect = async (req, res, next) => {
    let token;

    // 1) Get the token and check it's there
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if(!token) {
        return next(new AppError('You are not logged in, please login to get access', 401)); //401 - Unauthorized
    }

    // 2) Varification of token

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if(!currentUser) {
        return next(new AppError('The user belongs to this token does no longer exist.', 401));
    }

    // Grant access to the prodected rout
    req.user = currentUser;
    res.locals.user = currentUser;

    next();

};


// function to restrict access

export function restrictTo(...roles) {
    return (req, res, next) => {
        // roles ['admin', 'driver'], role = 'user'
        if (!roles.includes(req.user.role)) {
            return next(new AppError('You do not have permission.', 403))
        }
        next();
    }
}