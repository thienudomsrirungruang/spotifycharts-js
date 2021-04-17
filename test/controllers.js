const sinon = require("sinon");

const charts = require("../controllers/charts");
const Song = require("../models/Song");
const mongoose = require("mongoose");
const Chart = require("../models/Chart");
const { expect } = require("chai");

describe("controllers/charts", () => {
    var songMock;
    var song;
    beforeEach(function(){
        songMock = sinon.mock(Song);
        song = new Song({spotifyId: 1});
        chartMock = sinon.mock(Chart);
        chart = new Chart({position: 1});
    });

    afterEach(function(){
        songMock.restore();
    });

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

    it("should add an existing song to charts", (done) => {
        songMock.expects("findOne").yields(null, song);
        
        let songSaveStub = sinon.stub(song, "save");
        let chartSaveStub = sinon.stub(chart, "save");

        charts.addSongObjToCharts(chart, song);

        sinon.assert.notCalled(songSaveStub);
        sinon.assert.calledOnce(chartSaveStub);
        expect(chart).to.have.property("songId").that.equals(1);
        
        done();
    });

    it("should create and add a new song to charts", (done) => {
        songMock.expects("findOne").yields(null, null);
        
        let songSaveStub = sinon.stub(song, "save");
        let chartSaveStub = sinon.stub(chart, "save");

        charts.addSongObjToCharts(chart, song);

        sinon.assert.calledOnce(songSaveStub);
        sinon.assert.calledOnce(chartSaveStub);
        expect(chart).to.have.property("songId").that.equals(1);
        
        done();
    });
});
