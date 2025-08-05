"use server";

import User from "@/database/users.model";
import { CreateUserParams } from "./shared.types";
import { connectToDatabase } from "../mongoose";

// create user

export const createUser = async (userData: CreateUserParams) => {
  try {
    await connectToDatabase();
    const newUser = await User.create(userData);

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
