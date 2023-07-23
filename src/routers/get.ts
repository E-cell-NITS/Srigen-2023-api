import express from "express";
import * as Controllers from "../controllers";

const router = express.Router();

router.get("/event", Controllers.Registration.get);

export default router;
