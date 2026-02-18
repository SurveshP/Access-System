import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{
        type: String
    },
    lastName:{
        type: String
    },
    emailAddress:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role: {
    type: String,
    enum: ['employee', 'admin', 'manager']
  }
    // roleId: [{ type: Schema.Types.ObjectId, ref: 'Role' }]
})

export default mongoose.model("User", userSchema);