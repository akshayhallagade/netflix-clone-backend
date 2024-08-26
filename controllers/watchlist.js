const watchlist = require("../model/watchlist");

const handleGetAllMovie = async (req, res) => {
  try {
    const MovieData = await watchlist.find({ userId: req.userId });

    res.json({ message: "Fetched Watchlist Data", MovieData });
  } catch (error) {
    res.json({ error: error });
  }
};

const handleAddMovie = async (req, res) => {
  try {
    // new user
    const newMovie = await watchlist.create({
      userId: req.userId,
      movieId: req.body.movieID,
    });
    console.log(req.body.movieID);

    return res.json({
      message: "New movie added successfully ",
      newMovie: newMovie._id,
    });
  } catch (err) {
    res.json({ error: err });
  }
};

const handleDeleteMovie = async (req, res) => {
  try {
    const deleteMovieData = await watchlist.findOneAndDelete({
      userId: req.userId,
      movieId: req.params.id,
    });

    res.json({
      message: "watchlist item deleted succesfully",
      id: deleteMovieData._id,
    });
  } catch (error) {
    res.json({ error });
  }
};

module.exports = { handleGetAllMovie, handleAddMovie, handleDeleteMovie };
