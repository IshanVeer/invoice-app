import { model, models, Schema, Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  name: string;
  email: string;
  password: string;
  picture: string;
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
  password: { type: String, required: true },
  picture: { type: String, required: true },
});

const User = models.User || model("User", UserSchema);

export default User;
