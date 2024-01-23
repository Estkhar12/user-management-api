import User from "../models/User.js";


export const getMe = async (req, res) => { 

  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({
      message: "User Details",
      data: user
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateMe = async (req, res) => {
  const { email, name, profileImg, phone, password } = req.body;
  if (email || phone || password) {
    return res.status(401).json({
      message: "Only you can changed your Name & Profile Image!",
    });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    });
    res.status(200).json({
      message: "User Updated",
      data: updatedUser
    })
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteMe = async (req, res,) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user._id);
    res.status(200).json({
      message: "User deleted!",
      data: null
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// for admins

export const getAllUsers = async (req, res) => { 

  try {
    const user = await User.find();
    res.status(200).json({
      message: "all users",
      data: user
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getSingleUser = async (req, res) => { 
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    res.status(200).json({
      message: "user details",
      data: user
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateUser = async (req, res) => { 
  const id = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      message: "User Updated",
      data: updatedUser
    })
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteUser = async (req, res,) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "User deleted!",
      data: null
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createNewAdmin = async (req, res,) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {role: 'admin'}, {
      new: true,
    });
    res.status(200).json({
      message: "User updated!",
      data: updatedUser
    });
  } catch (error) {
    res.status(500).json(error);
  }
};