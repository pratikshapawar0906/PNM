import express from "express";
import { apime, CheckStatusPublic, loginUser, ProtectedService, registerUser, RenewSubscription } from "../Controller/UserController.js";
import { auth, checkSubscriptionActive } from "../Middleware/auth.js";

const router = express.Router();



router.post("/register",registerUser);
router.post("/login",loginUser)

router.get("/status/:email",CheckStatusPublic);
router.post("/renew", auth, RenewSubscription);

router.get("/protected-service",auth,checkSubscriptionActive,ProtectedService)
router.get("/api/me", auth, apime)

export default router;