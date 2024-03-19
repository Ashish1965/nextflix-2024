import mongoose from "mongoose";

const NewFavoriteSchema = new mongoose.Schema(
  {
    uid: String,
    accountID: String,
    backdrop_path: String,
    poster_path: String,
    movieID: Number,
    type: String,
  },
  { timestamps: true }
);


export default mongoose.models.Favorites || mongoose.model("Favorites", NewFavoriteSchema);

