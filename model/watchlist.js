const { Schema, model } = require("mongoose");

const watchlistSchema = new Schema(
  {
    userId: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    movieId: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

const watchlist = model("Watchlist", watchlistSchema);

module.exports = watchlist;
