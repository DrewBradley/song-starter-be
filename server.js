const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const songRoutes = express.Router();
let bodyParser = require('body-parser')

let Song = require('./songs.model');

app.set('port', process.env.PORT || 3001);
app.use(cors());
// app.use(express.json());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/songs', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
  console.log("MongoDB database connection established successfully");
})

app.locals.title = 'Song Starter BE';

songRoutes.route('/').get(function(req, res) {
  Song.find(function(err, songs) {
      if (err) {
          console.log(err);
      } else {
          res.json(songs);
      }
  });
});

songRoutes.route('/:id').get(function(req, res) {
  let id = req.params.id;
  Song.findById(id, function(err, song) {
      res.json(song);
  });
});

songRoutes.route('/add').post(function(req, res) {
  let song = new Song(req.body);
  song.save()
      .then(song => {
          res.status(200).json({'song': 'song added successfully'});
      })
      .catch(err => {
          res.status(400).send('adding new song failed');
      });
});

songRoutes.route('/update/:id').post(function(req, res) {
  Song.findById(req.params.id, function(err, song) {
      if (!song)
          res.status(404).send("data is not found");
      else
          song.song_lyrics = req.body.song_lyrics;
          song.song_progression = req.body.song_progression;
          song.save().then(song => {
              res.json('Song updated!');
          })
          .catch(err => {
              res.status(400).send("Update not possible");
          });
  });
});

app.use('/songs', songRoutes);

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});

// app.post('/api/v1/songs', (request, response) => {
//   const id = Date.now();
//   const { lyrics, progression } = request.body;

//   for (let requiredParameter of ['lyrics', 'progression']) {
//     if (!request.body[requiredParameter]) {
//       response
//         .status(422)
//         .send({ error: `Expected format: { lyrics: <String>, progression: <String> }. You're missing a "${requiredParameter}" property.` });
//     }
//   }

//   // const { name, type } = song;
//   app.locals.songs.push({ id, lyrics, progression });

//   response.status(201).json({ id, lyrics, progression });
// });

// app.get('/api/v1/songs/:id', (request, response) => {
//   response.json({
//     id: request.params.id
//   });
// });