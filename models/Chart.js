const mongoose = require("mongoose");
var log = require("loglevel");

const chartSchema = new mongoose.Schema({
    date: Date,
    position: Number,
    streams: Number,
    songId: Number
});

const Chart = mongoose.model("Chart", chartSchema);

module.exports = Chart;
