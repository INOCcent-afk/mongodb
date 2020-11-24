const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const MONGODB_URL = "secret";

mongoose.connect(MONGODB_URL || "mongodb://localhost/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!!!!!!");
});

const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
  title: String,
  body: String,
  date: {
    type: String,
    default: Date.now(),
  },
});

const BlogPost = mongoose.model("BlogPost", BlogPostSchema);

// const data = {
//   title: "Welcome to my Youtube channel",
//   boyd: " iHellp folks to become a fullstack developers",
// };

app.post("/", (req, res, next) => {
  const newBlogPost = new BlogPost({
    title: req.body.title,
    body: req.body.body,
  });
  newBlogPost.save((err) => {
    if (err) {
      console.log("OOops, something went wrong ");
    } else {
      console.log("Data has been saveD!!!!!!");
    }
  });
  next();
});

app.get("/", (req, res) => {
  res.send("We are here");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server is running on PORT: ${PORT}`));
