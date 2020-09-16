import express from "express";
import mongoose from "mongoose";
import Cards from "./models/dbCard.js";
import Users from "./models/dbUser.js";
import Cors from "cors";

// app config
const app = express();
const PORT = process.env.PORT || 9000;

//MIDDLEWARE

app.use(express.json());
app.use(Cors());

//db config
const connectionUrl =
  "mongodb+srv://admin:BUbnguRZoKawxr4Q@tinder-clone.k3d9f.mongodb.net/tinderClone?retryWrites=true&w=majority";
mongoose.connect(connectionUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// api endpoint

//#region Tinder Cards
app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      "Welcome To The TINDER CLONE API Made by Antoni Carol 🚀 🔥 --> @antonicarol on Git and Twitter "
    );
});
//#endregion

//#region Users
app.post("/tinder/user/new", (req, res) => {
  const user = req.body;
  console.log(user);
  Users.find({ email: user.email }, (err, data) => {
    if (data.length === 0) {
      Users.create(user, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          console.log(data);
          res.status(201).send(data);
        }
      });
    } else {
      res.status(201).send("User Already Created!");
    }
  });
});

app.get("/tinder/user/:email", (req, res) => {
  const email = req.params["email"];
  console.log(email);
  Users.find({ email: email }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.put("/tinder/user/profile/update", (req, res) => {
  const profile = req.body;
  console.log(profile);
  const updatedProfile = {
    birthday: profile.birthday,
    profilePic: profile.pic,
    gender: profile.gender,
    passions: profile.passions,
    orientation: profile.orientation,
  };

  Users.findOneAndUpdate(
    { email: profile.email },
    {
      name: profile.name,
      firstTime: profile.firstTime,
      profile: updatedProfile,
    },
    { returnOriginal: false },
    (err, data) => {
      res.send(data);
    }
  );
});

app.get("/tinder/cards", (req, res) => {
  Users.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
//#endregion
app.listen(PORT, () => console.log(`Listening on port ${PORT}, all is ok!`));
