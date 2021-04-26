const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Song = new Schema({
    song_id: {
      type: Number
    },
    song_lyrics: {
        type: String
    },
    song_progression: {
        type: String
    },
});

module.exports = mongoose.model('Song', Song);