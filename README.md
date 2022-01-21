# musicdatabase

Introduction


This project is a music Database API which allows customers to bulid various front ends needed to use a database.
This database has more than 3000 tracks and 300 plus albums covering from Metal to classic.
This API intends to have people pay access which will be done by a token based authentication.
Data has be provided in the form of CVS files.
- Tracks
- Albums
- Artists
- Genres
 
 create a repo and run the command express-generator -> 
 `npm install -g express-generator`
 -> cd into any folders you have
 -> create a new file 
  -> open VS code 

To set up your Vs code you will need to import what you need to create a APP. This is done by using the treminal.
Make use of these commands to set up your working environment.

`npm intsall init -y`
`npm install --save expresss` 
`npm install --save mongoose`

This sets up your working environment to create a app.

```javascript const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 8050;```


I have made use of serval libraries. Use the command npm install to install the dependencies.
 `npm install --save jsonwebtooken`
`npm install --save passport-jwt`
`npm install --save passport`
`npm install --save passport-local-mongoose`

```javascript const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const passport = require("passport");
const passportJwt = require("passport-jwt");
const userRouter = require("./routes/user");
const passportLocalMongoose = require("passport-local-mongoose");
```
Mongoosedb - I used mongoosedb to import the data that was given to us,  using treminal and I just changed the filetype and filename 
For example:

`mongoimport --uri mongodb+srv://yasmin:<PASSWORD>@musicdatabase.1bg5s.mongodb.net/<DATABASE> --collection <COLLECTION> --type <tracks> --file <tracks.cvs>`




Endpoints 

Then, I started to work on the 7 endpoints that was given. All output needed to be in json.

I made a folder name `Routes` in that folder I made a file called `user.js`. 
user.js holds all the routes needed in the project.

->/register
->/login
->/tracks/id
->/tracks
->/artist/id
->/albums/id
->/genre

examples of endpoints 

```javascript router.get("/genres", (req, res) => {
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
``` 

postman is were you can test out the differnt endpoints.
This is a POST request with the path /genres by using postman it will display all the genres in the database. 

use this link in postman :

`http://localhost:3000/api/genres`

you should get an output of json data that looks like this:

```javascript {
        "_id": "61e5ac64d8b076d773469acd",
        "GenreId": 3,
        "Name": "Metal"
    },
    {
        "_id": "61e5ac64d8b076d773469ace",
        "GenreId": 5,
        "Name": "Rock And Roll"
    },
    {
        "_id": "61e5ac64d8b076d773469acf",
        "GenreId": 4,
        "Name": "Alternative & Punk"
    },
    {
        "_id": "61e5ac64d8b076d773469ad0",
        "GenreId": 1,
        "Name": "Rock"
    },
    {
        "_id": "61e5ac64d8b076d773469ad1",
        "GenreId": 8,
        "Name": "Reggae"
    },
    ```
    
    Here is another example of a route. this time its a GET request.

```javascript router.get("/artists/:id", (req, res) => {
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
```

This is a GET request with the path /artist/id by using postman 1 artist in the database will show  becuase I have specified in the path an id.

use this link in postman :

`http://localhost:3000/api/artists/2`

you should get an output of json data that looks like this:

```javascript "_id": "61e5abbd90302777864b58bd",
    "ArtistId": 1,
    "Name": "AC/DC" 
    ```


To go along with the routes schemas had to be created. I created a schemas for each of the routes.
-> example of a schema

```javascript const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
});

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema);

module.exports = { User };
```

Here you can see this is the user schema that requires a string for a username and a plugin for a password.















