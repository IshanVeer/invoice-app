"use server";

import User from "@/database/users.model";
import { UserParams } from "./shared.types";
import { connectToDatabase } from "../mongoose";

// create user

export const createUser = async (userData: UserParams) => {
  try {
    await connectToDatabase();
    const newUser = await User.create(userData);

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// get invoices

export const getInvoices = async (params: UserParams) => {
  const { clerkId } = params;

  try {
    connectToDatabase();
    const user = await User.findOne({ clerkId }).populate({
      path: "invoices",
      options: { sort: { createdAt: -1 } },
    });

    const invoices = user.invoices;
    return { invoices: invoices };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
