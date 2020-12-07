const {CreepList} = require("proto.Creep");
const {SpawnList} = require("proto.Spawn");
const {FlagList} = require("proto.Flag");
const {RoomList} = require("proto.Room");

const fakeMemory = {};

function MyGame(originalGame) {

    const tickCache = {};

    this.tickCache = function(id, construct) {
        if (!tickCache[id]) {
            tickCache[id] = construct();
        }
        return tickCache[id];
    };

    this.fakeMemory = fakeMemory;

    Object.defineProperty(this, 'creeps', {
        get: () => new CreepList(Object.entries(originalGame.creeps))
    });

    Object.defineProperty(this, 'flags', {
        get: () => new FlagList(Object.entries(originalGame.flags))
    });

    Object.defineProperty(this, 'rooms', {
        get: () => new RoomList(Object.entries(originalGame.rooms))
    });

    Object.defineProperty(this, 'spawns', {
        get: () => new SpawnList(Object.entries(originalGame.spawns))
    });

    return {

    };
}

function proto() {

    global.MyGame = new MyGame(Game);

}

module.exports = {
    proto
};