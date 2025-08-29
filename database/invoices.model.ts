import { Document, model, models, Schema } from "mongoose";

export interface Address {
  street: string;
  city: string;
  postCode: string;
  country: string;
}
export interface Item {
  itemName: string;
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

const requiredIfNotDraft = function (this: any) {
  const parent = this.ownerDocument ? this.ownerDocument() : this;
  return parent.status !== "draft";
};

const AddressSchema = new Schema<Address>({
  street: { type: String, required: requiredIfNotDraft },
  city: { type: String, required: requiredIfNotDraft },
  postCode: { type: String, required: requiredIfNotDraft },
  country: { type: String, required: requiredIfNotDraft },
});
const ItemSchema = new Schema<Item>({
  itemName: { type: String, required: requiredIfNotDraft },
  quantity: { type: Number, required: requiredIfNotDraft },
  price: { type: Number, required: requiredIfNotDraft },
  total: { type: Number, required: requiredIfNotDraft },
});

const InvoiceSchema = new Schema<IInvoice>({
  createdAt: { type: Date, default: Date.now },
  paymentDue: { type: Date, required: requiredIfNotDraft },
  description: { type: String, required: requiredIfNotDraft },
  paymentTerms: { type: Number, required: requiredIfNotDraft },
  clientName: { type: String, required: requiredIfNotDraft },
  clientEmail: {
    type: String,
    required: requiredIfNotDraft,
    match: [/\S+@\S+\.\S+/, "is invalid"],
  },
  status: {
    type: String,
    enum: ["draft", "pending", "paid"],
    default: "draft",
  },
  senderAddress: { type: AddressSchema, required: requiredIfNotDraft },
  clientAddress: { type: AddressSchema, required: requiredIfNotDraft },
  items: { type: [ItemSchema], required: requiredIfNotDraft },
  total: { type: Number, required: requiredIfNotDraft },
});

const Invoice = models.Invoice || model("Invoice", InvoiceSchema);
export default Invoice;
