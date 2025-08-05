import { model, models, Schema, Document } from "mongoose";

export interface Address {
  street: string;
  city: string;
  postCode: string;
  country: string;
}
export interface Item {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Invoice {
  createdAt: Date;
  paymentDue: Date;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: string;
  senderAddress: Address;
  clientAddress: Address;
  items: Item[];
  total: number;
}
export interface IUser extends Document {
  clerkId: string;
  name: string;
  email: string;
  picture: string;
  invoices: Invoice[];
}

const AddressSchema = new Schema<Address>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  postCode: { type: String, required: true },
  country: { type: String, required: true },
});
const ItemSchema = new Schema<Item>({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  total: { type: Number, required: true },
});

const InvoiceSchema = new Schema<Invoice>({
  createdAt: { type: Date, default: Date.now },
  paymentDue: { type: Date, required: true },
  description: { type: String, required: true },
  paymentTerms: { type: Number, required: true },
  clientName: { type: String, required: true },
  clientEmail: {
    type: String,
    required: true,
    match: [/\S+@\S+\.\S+/, "is invalid"],
  },
  status: {
    type: String,
    enum: ["draft", "pending", "paid"],
    default: "draft",
  },
  senderAddress: { type: AddressSchema, required: true },
  clientAddress: { type: AddressSchema, required: true },
  items: { type: [ItemSchema], required: true },
  total: { type: Number, required: true },
});

// define user schema

const UserSchema = new Schema<IUser>({
  clerkId: { type: String, required: true },
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    match: [/\S+@\S+\.\S+/, "is invalid"],
  },
  picture: { type: String, required: true },
  invoices: { type: [InvoiceSchema], default: [] },
});

const User = models.User || model("User", UserSchema);

export default User;
