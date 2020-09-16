import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  firstTime: Boolean,
  location: {
    lat: Number,
    long: Number,
  },
  profile: {
    profilePic: String,
    gender: String,
    birthday: String,
    passions: Array,
    orientation: Array,
  },
});

export default mongoose.model("tinderUsers", userSchema);
