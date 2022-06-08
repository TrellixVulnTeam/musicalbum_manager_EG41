const express = require("express");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const Genre = require("../model/genreModel");
const Album = require("../model/albumModel");

const albumRouter = express();

albumRouter.get("/", (req, res, next) => {
  Album.find({}, (err, albums) => {
    if (err) {
      res.status(400).json({ error: "error finding ablums" });
    }
    res.render("albums/index", { albums });
  });
});

albumRouter.get("/add", (req, res, next) => {
  Genre.find({}, (err, genre) => {
    if (err) {
      console.log(err);
    }
    res.render("albums/add", { genre });
  });
});

albumRouter.post("/add", (req, res, next) => {
  const form = new formidable.IncomingForm({
    keepExtensions: true,
    uploadPath: `${__dirname}/../uploads`,
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    let album = new Album(fields);
    if (files.cover) {
      // album.cover.data = fs.readFileSync(files.cover.path);
      album.cover = files.cover.type;
    }
    console.log(album);
    album.save((err, data) => {
      if (err) {
        res.status(400).json({ error: "error saving data to database" });
      }
      req.flash("success", "album successfully saved");
      res.redirect("/albums");
    });
  });
});

//get single album

albumRouter.get("/detail/:id", (req, res) => {
  Album.findOne({ id: req.params.id }, (err, album) => {
    if (err) {
      res.status(400).json({ err: "album not found" });
    }
    res.render("albums/detail", { album });
  });
});

//middleware
albumRouter.get("/edit/:id", (req, res) => {
  Album.findById(req.params.id, (err, album) => {
    Genre.find({}, (err, genre) => {
      if (err) {
        res.status(400).json({ error: "album do not exist" });
      }
      res.render("albums/edit", { album, genre });
    });
  });
});

//update call

albumRouter.route("/edit/:id").post((req, res) => {
  const form = new formidable.IncomingForm({
    keepExtensions: true,
    uploadPath: `${__dirname}/../uploads`,
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    let album = new Album(fields);
    //let cover = files.cover;
    if (files.cover) {
      album.cover.data = fs.readFileSync(files.cover.path);
      album.cover.contentType = files.cover.type;
    }
    const { name, artist, title, genre, info, year, label, tracks } = fields;
    console.log(fields.name);
    Album.findByIdAndUpdate(
      req.params.id,
      { name, artist, title, genre, info, year, label, tracks },
      (err, data) => {
        if (err) {
          res.status(400).json({ error: "error updating data to database" });
        }
        res.redirect("/albums");
      }
    );
  });
});

// delete call
albumRouter.get("/delete/:id", (req, res) => {
  Album.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.status(400).json({ error: "error deleting album" });
    }
    res.redirect("/albums");
  });
});

module.exports = albumRouter;