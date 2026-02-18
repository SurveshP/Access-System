import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

export default mongoose.model("Document", documentSchema);
