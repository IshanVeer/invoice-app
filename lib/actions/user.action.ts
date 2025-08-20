"use server";

import User from "@/database/users.model";
import { UserParams } from "./shared.types";
import { connectToDatabase } from "../mongoose";
import Invoice from "@/database/invoices.model";
import { InvoiceProps } from "@/types";

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
    await connectToDatabase();
    const user = await User.findOne({ clerkId }).populate({
      path: "invoices",
      model: Invoice,
      options: { sort: { createdAt: -1 } },
    });

    const invoices = user.invoices;
    return { invoices: invoices };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// create invoice

export const createInvoice = async (
  params: InvoiceProps & { clerkId: string }
) => {
  const {
    clerkId,
    createdAt,
    paymentDue,
    description,
    paymentTerms,
    clientName,
    clientEmail,
    status,
    senderAddress,
    clientAddress,
    items,
    total,
  } = params;
  try {
    await connectToDatabase();

    const invoice = await Invoice.create({
      createdAt,
      paymentDue,
      description,
      paymentTerms,
      clientName,
      clientEmail,
      status,
      senderAddress,
      clientAddress,
      items,
      total,
    });

    const updatedUser = await User.findOneAndUpdate(
      { clerkId },
      { $push: { invoices: invoice._id } },
      { new: true }
    ).populate("invoices");

    return { invoices: JSON.parse(JSON.stringify(updatedUser.invoices)) };
  } catch (error) {
    console.log("server action error", error);
    throw error;
  }
};
