import { Router } from "express";
import Scanner from "./Scanner.js";
import Recognizer from "./Recognizer.js";

const router = Router();

router.get("/", (req, res) => {
  res.json("Hello World!");
});
router.post("/scanner", Scanner);
router.post("/recognizer", Recognizer);

export default router;
