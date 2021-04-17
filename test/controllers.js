const sinon = require("sinon");

const charts = require("../controllers/charts");
const Song = require("../models/Song");
const mongoose = require("mongoose");

describe("controllers/charts", () => {
    var songMock;
    var song;
    beforeEach(function(){
        songMock = sinon.mock(Song);
        song = new Song({spotifyId: 1});
    })

    afterEach(function(){
        songMock.restore();
    })

    it("should create a new song if it doesn't exist", (done) => {
        songMock.expects("findOne").yields(null, null);
        
        let saveStub = sinon.stub(song, "save");

        charts.addSongIfNotExists(song);

        sinon.assert.calledOnce(saveStub);
        
        done();
    });

    it("should not create a new song if it exists", (done) => {
        songMock.expects("findOne").yields(null, song);
        
        let saveStub = sinon.stub(song, "save");

        charts.addSongIfNotExists(song);

        sinon.assert.notCalled(saveStub);
        
        done();
    });
});
