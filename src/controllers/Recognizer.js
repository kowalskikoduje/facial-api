import Descriptor from "../models/DescriptorModel.js";
import {
  loadModels,
  createMatcher,
  isFaceDetectionModelLoaded,
} from "../utils/face.js";

export const Recognizer = async (req, res, _next) => {
  console.log("POST /recognizer");

  await loadModels();

  if (isFaceDetectionModelLoaded()) {
    try {
      const { descriptor } = req.body,
        descriptors = await Descriptor.find(),
        matcher = await createMatcher(descriptors),
        bestMatch = matcher.findBestMatch(Object.values(descriptor));

      return res.json({
        msg: "Recognition succeed",
        match: bestMatch._label,
      });
    } catch (err) {
      console.log(
        "Recognition failed with error: ",
        err.message,
        "\n",
        err.stack
      );

      return res.json({ msg: "Recognition failed" });
    }
  }
};

export default Recognizer;
