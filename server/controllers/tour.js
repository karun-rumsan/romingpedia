import tourModel from "../models/tour.js";
import mongoose from "mongoose";

export const createTour = async (req, res) => {
  const tour = req.body;
  const newTour = new tourModel({
    ...tour,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newTour.save();
    res.status(201).json(newTour);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getTours = async (req, res) => {
  const { page } = req.query;

  try {
    const limit = 6;
    const startIndex = (Number(page) - 1) * limit;
    const total = await tourModel.countDocuments({});
    const tours = await tourModel.find().limit(limit).skip(startIndex);

    await res.status(200).json({
      data: tours,
      currentPage: Number(page),
      totalTours: total,
      numberofPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getTour = async (req, res) => {
  const { id } = req.params;
  try {
    const tour = await tourModel.findById(id);
    await res.status(200).json(tour);
  } catch (error) {
    res.status(404).json({ message: "Something went wrongs" });
  }
};

export const getTourByUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Invalid ID" });
  }
  const userTours = await tourModel.find({ creator: id });
  console.log(id);
  res.status(200).json(userTours);
};

export const deleteTour = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Invalid ID" });
    }
    await tourModel.findByIdAndRemove(id);
    res.status(200).json({ message: "Successfully Deleted" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrongs" });
  }
};

export const patchTour = async (req, res) => {
  const { id } = req.params;
  const { title, description, tags, creator, imageFile } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No tour exist with ${id}` });
    }
    const updatedTour = {
      title,
      description,
      tags,
      creator,
      imageFile,
      _id: id,
    };
    await tourModel.findByIdAndUpdate(id, updatedTour, { new: true });
    await res.status(200).json({ message: "Successfully Updated" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrongs" });
  }
};

export const getTourBySearch = async (req, res) => {
  const { searchQuery } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");
    const tourSearch = await tourModel.find({ title });
    await res.status(200).json(tourSearch);
  } catch (error) {
    res.status(404).json({ message: "Something went wrongs" });
  }
};

export const getTourByTag = async (req, res) => {
  const { tag } = req.params;
  try {
    const tagtours = await tourModel.find({ tags: { $in: tag } });
    res.status(200).json(tagtours);
  } catch (error) {
    res.status(404).json({ message: "Something went wrongs" });
  }
};

export const getRelatedTour = async (req, res) => {
  const tags = req.body;
  try {
    const relatedTours = await tourModel.find({ tags: { $in: tags } });
    await res.status(200).json(relatedTours);
  } catch (error) {
    res.status(404).json({ message: "Something went wrongs" });
  }
};

export const likesTour = async (req, res) => {
  const { id } = req.params;

  try {
    if (!req.userId) {
      return res.status(401).json({ message: "You must be logged in" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Invalid ID" });
    }
    const tour = await tourModel.findById(id);
    const index = tour.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      tour.likes.push(req.userId);
    } else {
      tour.likes = tour.likes.filter((id) => id !== String(req.userId));
    }

    const updatedTour = await tourModel.findByIdAndUpdate(id, tour, {
      new: true,
    });
    await res.status(200).json(updatedTour);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};
