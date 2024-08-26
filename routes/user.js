const { Router } = require("express");
const {
  handleSignUp,
  handleLogIn,
  handleGetUserProfile,
} = require("../controllers/user");

const router = Router();

router.get("/profile", handleGetUserProfile);
router.post("/signup", handleSignUp);
router.post("/login", handleLogIn);

module.exports = router;
