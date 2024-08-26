const { Router } = require("express");
const {
  handleAddMovie,
  handleDeleteMovie,
  handleGetAllMovie,
} = require("../controllers/watchlist");
const { EnsureAuthenticated } = require("../middleware/authentication");

const router = Router();

router.use(EnsureAuthenticated());

router.get("/", handleGetAllMovie);
router.post("/", handleAddMovie);
router.delete("/:id", handleDeleteMovie);

module.exports = router;
