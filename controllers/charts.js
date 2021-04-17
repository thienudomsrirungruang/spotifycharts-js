const Chart = require("../models/Chart");
const Song = require("../models/Song");
var log = require("loglevel");

module.exports.addSongIfNotExists = (song) => {
    Song.findOne({spotifyId: song.spotifyId}, (err, existingSong) => {
        if(err){
            log.error(err);
            return;
        }
        if(!existingSong){
            song.save((err) => {
                if(err){
                    log.error(err);
                    return;
                }
            });
            log.debug(`New song added: ${song.spotifyId}`);
        }
        else{
            log.debug(`${song.spotifyId} already exists, skipping`);
        }
    })
};

module.exports.addSongObjToCharts = (chart, song) => {
    this.addSongIfNotExists(song);
    chart.songId = song.spotifyId;
    chart.save((err) => {
        if(err){
            log.error(err);
            return;
        }
    });
}
