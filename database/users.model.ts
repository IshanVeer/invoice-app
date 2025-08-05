import { model, models, Schema, Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  name: string;
  email: string;
  picture: string;
  invoices: Schema.Types.ObjectId[];
}

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
  invoices: [{ type: Schema.Types.ObjectId, ref: "Invoice" }],
});

const User = models.User || model("User", UserSchema);

export default User;
