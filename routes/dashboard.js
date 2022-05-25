import express from "express";
import { getProjectDistr } from "../controllers/dashboard.js";

const router = express.Router();

//all routes in here are starting with /dashboard
router.get("/", getProjectDistr);

export default router;