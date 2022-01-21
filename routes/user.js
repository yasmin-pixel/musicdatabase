const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { Track } = require("../models/track");
const { Genre } = require("../models/genre");
const { User } = require("../models/user");
const { Album } = require("../models/albums");
const { Artist } = require("../models/artists");

const jwtOptions = {
  secretOrKey: "secret!!!",
};

router.post("/register", (req, res) => {
  console.log(req.body);
  if (req.body.username && req.body.password) {
    User.findOne({ username: req.body.username }, (error, user) => {
      if (error) {
        res.status(401).json(error);
      } else if (user) {
        res.status(401).json({ message: "username is already in use" });
      } else {
        const newUser = new User({ username: req.body.username });
        User.register(newUser, req.body.password, (error) => {
          if (error) {
            res.status(401).json(error);
          } else {
            res
              .status(201)
              .json({ message: " You have successfully registered" });
          }
        });
      }
    });
  } else {
    res.status(401).json({ message: "missing username or password" });
  }
});

router.post("/login", (req, res) => {
  if (req.body.username && req.body.password) {
    User.findOne({ username: req.body.username }, (error, user) => {
      if (user) {
        user.authenticate(req.body.password, (error, user) => {
          if (error) {
            res.status(401).json({ message: "invalid username or password" });
          } else {
            const unique_identifier = { username: user.username };
            const token = jwt.sign(unique_identifier, jwtOptions.secretOrKey);
            res.status(200).json({
              message: `welcome, you have successfully sgined in, ${user.username}`,
              token: token,
            });
          }
        });
      } else {
        res.status(401).json({ message: "invalid username or password" });
      }
    });
  }
});

router.get("/tracks/:id", (req, res) => {
  console.log(req.params.id);
  Track.findOne({ TrackId: parseInt(req.params.id) }, function (error, tracks) {
    if (error) {
      res.status(400).json({
        message: "track not found",
      });
    } else {
      res.json(tracks);
    }
  });
});

router.get("/genres", (req, res) => {
  Genre.find({}, function (error, genres) {
    if (error) {
      res.status(400).json({
        message: "genre not found",
      });
    } else {
      res.json(genres);
    }
  });
});
router.get("/albums/:id", (req, res) => {
  Album.findOne({ Album: req.params.id }, function (error, album) {
    if (error) {
      res.status(400).json({
        message: "album not found",
      });
    } else {
      res.json(album);
    }
  });
});

router.post("/tracks", (req, res) => {
  const track = new Track(req.body);
  track.save(function (error, tracks) {
    if (error) {
      res.status(400).json({
        message: "track not found",
      });
    } else {
      res.json(tracks);
    }
  });
});

router.get("/artists/:id", (req, res) => {
  Artist.findOne({ Artist: req.params.id }, function (error, artist) {
    if (error) {
      res.status(400).json({
        message: "Artist found",
      });
    } else {
      res.json(artist);
    }
  });
});

module.exports = router;
