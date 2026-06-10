import type { Request, Response } from "express";
import mongoose from "mongoose";
import {
  getSingleCatService,
  createCatService,
  getAllCatsService,
  searchCatsService,
  recommendService,
} from "../services/cat.service.ts";
import { mockBreeds } from "../scripts/seed.ts";

// Generate stable mock _ids in memory for fallback queries
const getFallbackBreeds = () => {
  return mockBreeds.map((b, idx) => ({
    ...b,
    _id: `mock-${idx + 1}-${b.name.toLowerCase().replace(/\s+/g, "-")}`,
  }));
};

export const createCatController = async (req: Request, res: Response) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message: "Database offline. Create operations are unavailable.",
    });
  }

  try {
    let result = await createCatService(req.body);
    return res.status(201).json({
      success: true,
      message: "Cat created",
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error creating cat breed",
    });
  }
};

export const getAllCatsController = async (req: Request, res: Response) => {
  if (mongoose.connection.readyState !== 1) {
    console.warn("MongoDB is offline. Serving memory fallback breeds.");
    return res.status(200).json({
      success: true,
      message: "Cats fetched (Fallback Mode)",
      data: getFallbackBreeds(),
    });
  }

  try {
    let result = await getAllCatsService();
    return res.status(200).json({
      success: true,
      message: "Cats fetched",
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error fetching cat breeds",
    });
  }
};

export const getSingleCatController = async (req: Request, res: Response) => {
  let id = req.params.id as string;

  if (mongoose.connection.readyState !== 1 || id.startsWith("mock-")) {
    console.warn("MongoDB offline or mock ID requested. Serving single memory fallback breed.");
    const fallbacks = getFallbackBreeds();
    const found = fallbacks.find((b) => b._id === id) || fallbacks[0];
    return res.status(200).json({
      success: true,
      message: "Cat fetched (Fallback Mode)",
      data: found,
    });
  }

  try {
    let result = await getSingleCatService(id);
    return res.status(200).json({
      success: true,
      message: "Cat fetched",
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error fetching cat breed details",
    });
  }
};

export const searchCatController = async (req: Request, res: Response) => {
  let q = (req.query.q as string || "").toLowerCase();

  if (mongoose.connection.readyState !== 1) {
    console.warn("MongoDB is offline. Performing search in memory fallbacks.");
    const fallbacks = getFallbackBreeds();
    const filtered = fallbacks.filter(
      (b) => b.name.toLowerCase().includes(q) || b.breed.toLowerCase().includes(q)
    );
    return res.status(200).json({
      success: true,
      message: "Cats fetched (Fallback Mode)",
      data: filtered,
    });
  }

  try {
    let result = await searchCatsService(q);
    return res.status(200).json({
      success: true,
      message: "Cats fetched",
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error searching cat breeds",
    });
  }
};

export const recommendCatsController = async (req: Request, res: Response) => {
  const { kidsFriendly, apartmentFriendly } = req.body;

  if (mongoose.connection.readyState !== 1) {
    console.warn("MongoDB is offline. Performing matching in memory fallbacks.");
    const fallbacks = getFallbackBreeds();
    const filtered = fallbacks.filter(
      (b) => b.kidsFriendly === kidsFriendly && b.apartmentFriendly === apartmentFriendly
    );
    return res.status(200).json({
      success: true,
      message: "Cat fetched (Fallback Mode)",
      data: filtered,
    });
  }

  try {
    const result = await recommendService(kidsFriendly, apartmentFriendly);
    return res.status(200).json({
      success: true,
      message: "Cat fetched",
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error calculating recommendations",
    });
  }
};
