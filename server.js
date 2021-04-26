const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const songRoutes = express.Router();
let bodyParser = require('body-parser')

app.set('port', process.env.PORT || 3001);
app.use('/songs', songRoutes);
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
  console.log("MongoDB database connection established successfully");
})

app.locals.title = 'Song Starter BE';

songRoutes.route('/').get(function(req, res) {
  Song.find(function(err, todos) {
      if (err) {
          console.log(err);
      } else {
          res.json(todos);
      }
  });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});

app.locals.songs = [
  { id: '1', name: 'Jessica', type: 'dog' },
  { id: '2', name: 'Marcus Aurelius', type: 'parakeet' },
  { id: '3', name: 'Craisins', type: 'cat' }
];

app.get('/api/v1/songs', (request, response) => {
  const songs = app.locals.songs;

  response.json({ songs });
});

app.post('/api/v1/songs', (request, response) => {
  const id = Date.now();
  const { lyrics, progression } = request.body;

  for (let requiredParameter of ['lyrics', 'progression']) {
    if (!request.body[requiredParameter]) {
      response
        .status(422)
        .send({ error: `Expected format: { lyrics: <String>, progression: <String> }. You're missing a "${requiredParameter}" property.` });
    }
  }

  // const { name, type } = song;
  app.locals.songs.push({ id, lyrics, progression });

  response.status(201).json({ id, lyrics, progression });
});

// app.get('/api/v1/songs/:id', (request, response) => {
//   response.json({
//     id: request.params.id
//   });
// });