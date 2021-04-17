const mongoose = require("mongoose");
var log = require("loglevel");

const songSchema = new mongoose.Schema({
    spotifyId: {type: Number, unique: true, index: true},
    trackName: String,
    artist: String,
    danceability: Number,
    energy: Number,
    key: Number,
    loudness: Number,
    mode: Number,
    speechiness: Number,
    acousticness: Number,
    instrumentalness: Number,
    liveness: Number,
    valence: Number,
    tempo: Number,
    durationMs: Number,
    timeSignature: Number
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
