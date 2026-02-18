import mongoose, { Schema } from "mongoose";

const controlRoleSchema = new mongoose.Schema({
    controlName:{
        type: String
    },
})

export default mongoose.model("ControlRole", controlRoleSchema);