import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  firstTime: Boolean,
  profile: {
    pics: Array,
    gender: String,
    age: Number,
  },
});

export default mongoose.model("tinderUsers", userSchema);
