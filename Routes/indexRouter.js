const express = require("express");
const Album = require("../model/albumModel")

const indexRouter = express();

indexRouter.get("/", (req, res) => {
	Album.find({}, (err, albums) => {
		if(err) {
			res.status(500).json({msg: err})
		}res.render("albums/index", {albums});		
	})
  
});

indexRouter.get("/about", (req, res) => {
	res.render("about")
})

module.exports = indexRouter;