const express = require("express");
const authController = require("../../controllers/AuthController/authController");
const authMiddleware = require("../../middleware/authMiddleware");
const { resetPasswordValidator } = require("../../utilis/BodyValidator");
const router = express.Router();

router.post("/auth/register", authController.register);

// Login route
router.post("/auth/login", authController.login);

router.post(
  "/auth/change-password",
  authMiddleware,
  resetPasswordValidator,
  authController.resetPassword
);

router.post(
  "/auth/forget-password",
  authController.forgetPassword
);

router.post(
  "/auth/reset-password/:token",
  authController.recoverPassword
);
// Refresh token route
router.post("/refresh-token", authController.refreshToken);

router.delete("/refresh-token", authController.deleteRefreshTOken);

module.exports = router;
