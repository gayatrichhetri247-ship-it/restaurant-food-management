import foodModel from "../src/models/food.model.js";
import uploadOnCloudinary from "../src/utils/cloudinary.js";
import { success } from "./order.controller.js";

import fs from "fs";

export const createfood = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    console.log("req.file:", req.file);

    if (req.file) {
      console.log("File exists:", fs.existsSync(req.file.path));
      console.log("File path:", req.file.path);
    }

    let url = null;

    if (req.file) {
      const result = await uploadOnCloudinary(req.file.path);

      if (!result) {
        return res.status(500).json({
          success: false,
          message: "Cloudinary upload failed",
        });
      }

      url = result.secure_url;
    }

    const food = await foodModel.create({
      name,
      description,
      price,
      photo: url,
    });

    res.status(201).json({
      success: true,
      message: "Food created",
      food,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getFoods = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 8;
    const skip = (page - 1) * limit;

    const totalFoods = await foodModel.countDocuments();

    const foods = await foodModel
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      foods,
      currentPage: page,
      totalPages: Math.ceil(totalFoods / limit),
      totalFoods,
      hasNextPage: page < Math.ceil(totalFoods / limit),
      hasPreviousPage: page > 1,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const deleteFood = async (req, res) => {
  try {
    const id = req.params.id;
    await foodModel.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Food deleted",
      success: true,
    });
  } catch {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
export const editFood = async (req, res) => {
  try {
    const id = req.params.id;
    const food = await foodModel.findById(id);
    const { name, description, price } = req.body;

    let url = food.photo || null;
    if (req.file) {
      const response = await uploadOnCloudinary(req.file.path);
      url = response.secure_url;
    }
    const updatedFood = await foodModel.findByIdAndUpdate(id, {
      name,
      description,
      price,
      photo: url,
    },{new:true});
    res.status(200).json({
      message: "Food Edited",
      success: true,
      food: updatedFood,
    });
  } catch {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
