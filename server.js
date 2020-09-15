import express from "express";
import mongoose from "mongoose";
import Cards from "./dbCard.js";
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
});

// api endpoint

app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      "Welcome To The TINDER CLONE API Made by Antoni Carol 🚀 🔥 --> @antonicarol on Git and Twitter "
    );
});

app.post("/tinder/card/new", (req, res) => {
  const card = req.body;
  Cards.create(card, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/tinder/cards", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}, all is ok!`));
