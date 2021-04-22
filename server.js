const express = require('express');
const app = express();
const cors = require('cors');

app.set('port', process.env.PORT || 3001);
app.use(cors());
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

// app.get('/api/v1/pets/:id', (request, response) => {
//   response.json({
//     id: request.params.id
//   });
// });