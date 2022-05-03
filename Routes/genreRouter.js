const express = require("express");
const Genre = require("../model/genreModel");

const genreRouter = express();

genreRouter.get("/", (req, res) => {
  Genre.find({}, (err, genre) => {
    if (err) {
      res
        .status(400)
        .json({ error: "error finding music genre from database" });
    }
    res.render("genres/index", { genre });
  });
});

genreRouter.get("/add", (req, res) => {
  res.render("genres/add");
});

genreRouter.post("/add", (req, res) => {
  const { name } = req.body;

  const genre = new Genre({ name });

  genre.save((err, data) => {
    if (err) {
      console.log(err);
    }
    req.flash("info", "genre successfully added");
    res.redirect("/genres");
  });
});

//update call
genreRouter.route("/edit/:id").get((req, res) => {
  Genre.findById(req.params.id, (err, genre) => {
    if (err) {
      res.status(400).json({ error: "error finding Genre" });
    }
    res.render("genres/edit", { genre });
  });
});

genreRouter.post("/edit/:id", (req, res) => {
  const { name } = req.body;
  Genre.findByIdAndUpdate(req.params.id, { name }, (err, data) => {
    if (err) {
      res.status(400).json({ error: "error updating genre" });
    }
    req.flash("info", "genre successfully updated");
    res.redirect("/genres");
    console.log(data);
  });
});

genreRouter.get("/delete/:id", (req, res) => {
  Genre.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.status(400).json({ error: "error deleting genre from database" });
    }
    req.flash("info", "genre successfully deleted");
    req.flash("info", "Flash is back!");
    res.redirect("/genres");
  });
});

module.exports = genreRouter;
