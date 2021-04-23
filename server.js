const express = require('express');

const app = express();
const cors = require('cors');
let bodyParser = require('body-parser')

app.set('port', process.env.PORT || 3001);
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.locals.title = 'Song Starter BE';

app.get('/', (request, response) => {
  response.send('Songs go here!');
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
        .send({ error: `Expected format: { name: <String>, type: <String> }. You're missing a "${requiredParameter}" property.` });
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