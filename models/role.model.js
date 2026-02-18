import mongoose, { Schema } from "mongoose";

const roleSchema = new mongoose.Schema({
    roleName:{
        type: String
    },
    controlId: [{ type: Schema.Types.ObjectId, ref: 'ControlRole' }]
})

export default mongoose.model("Role", roleSchema);