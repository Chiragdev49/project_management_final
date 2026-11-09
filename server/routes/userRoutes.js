import express from "express";
import { registerUser ,getUser,login,logout,forgotPassword,resetPassword} from "../controllers/authController.js";
import multer  from "multer";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router =express.Router();

router.post("/register",registerUser);
router.post("/login",login);
router.get("/me",isAuthenticated,getUser);
router.get("/logout",isAuthenticated,logout);
router.post("/password/forgot",forgotPassword);
router.put("/password/reset/:token",resetPassword); //: after this: this called params

export default router;
