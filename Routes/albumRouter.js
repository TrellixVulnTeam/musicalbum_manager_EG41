const express = require("express");
const Genre = require("../model/genreModel");
const Album = require("../model/albumModel");
//const {upload} = require("../Src/uploads")


const albumRouter = express();

//get all album
albumRouter.get("/", (req, res, next) => {
  Album.find({}, (err, albums) => {
    if (err) {
      res.status(400).json({msg: "error finding ablums" });
    }
    res.render("albums/index", {albums});
  });
});

//find album update page
albumRouter.get("/add", (req, res, next) => {
  Genre.find({}, (err, genre) => {
    if (err) {
      console.log(err);
    }
    res.render("albums/add", { genre });
  });
});

//create album
albumRouter.post("/add", (req, res) => {
	const { name, artist, title, genre, info, year, label, tracks} = req.body
	const cover = req.file.location
	
  let album = new Album({name, artist, title, genre, info, year, label, tracks, cover});
    
    album.save((err, data) => {
      if (err) {
        res.status(500).json({ error: "error saving data to database" });
      }
      req.flash("success", "album successfully saved");
      res.redirect("/albums");
    });
  });


//get single album
albumRouter.get("/detail/:id", (req, res) => {
  Album.findOne({ id: req.params.id }, (err, album) => {
    if (err) {
      res.status(500).json({msg: "album not found"});
    }
    res.render("albums/detail", { album });
  });
});

//update album
albumRouter.get("/edit/:id", (req, res) => {
  Album.findById(req.params.id, (err, album) => {
    Genre.find({}, (err, genre) => {
      if (err) {
        res.status(500).json({ msg: "album do not exist" });
      }
      res.render("albums/edit", { album, genre });
    });
  });
});


albumRouter.route("/edit/:id").post((req, res) => {
  
    const { name, artist, title, genre, info, year, label, tracks} = req.body
    const cover = req.file.location
    
    Album.findByIdAndUpdate(
      req.params.id,
      { name, artist, title, genre, info, year, label, tracks, cover },
      (err, data) => {
        if (err) {
          res.status(500).json({msg: "error updating music data" });
        }
        res.redirect("/albums");
      }
    );
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