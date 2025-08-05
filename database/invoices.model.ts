import { Document, model, models, Schema } from "mongoose";

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

export interface IInvoice extends Document {
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

const InvoiceSchema = new Schema<IInvoice>({
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

const Invoice = models.Invoice || model("Invoice", InvoiceSchema);
export default Invoice;
