import mongoose from "mongoose";

const descriptorSchema = new mongoose.Schema({
  label: { type: String },
  descriptors: mongoose.Schema.Types.Mixed,
});

export const Descriptor = mongoose.model("Descriptor", descriptorSchema);
export default Descriptor;
