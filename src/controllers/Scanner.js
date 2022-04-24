import Descriptor from "../models/DescriptorModel.js";

export const Scanner = async (req, res, _next) => {
  console.log("POST /scanner");

  try {
    const { label, descriptors } = req.body,
      newDescriptor = await Descriptor({
        label,
        descriptors,
      }).save();

    return res.json({
      msg: "Created descriptor succesfully",
      descriptor: newDescriptor,
    });
  } catch (err) {
    console.log(
      "Creating descriptor failed with error: ",
      err.message,
      "\n",
      err.stack
    );

    res.status(500);
    return res.json({ msg: "Creating descriptor failed" });
  }
};

export default Scanner;
