import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    date: Date,
    location: String,
    description: String,
    price: Number,
    ticketsAvailable: Number,

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
