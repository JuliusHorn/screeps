const {CreepList} = require("proto.Creep");
const {SpawnList} = require("proto.Spawn");
const {FlagList} = require("proto.Flag");
const {RoomList} = require("proto.Room");

const fakeMemory = {};

function proto() {

    const tickCache = {};

    Game.tickCache = function(id, construct) {
        if (!tickCache[id]) {
            tickCache[id] = construct();
        }
        return tickCache[id];
    };

    Game.fakeMemory = fakeMemory;

    const creeps = Game.creeps;
    const flags  = Game.flags;
    const rooms  = Game.rooms;
    const spawns = Game.spawns;

    Game.originalCreeps = creeps;
    Game.originalFlags  = flags;
    Game.originalRooms  = rooms;
    Game.originalSpawns = spawns;

    Object.defineProperty(Game, 'creepList', {
        get: () => new CreepList(Object.entries(creeps))
    });

    Object.defineProperty(Game, 'flagList', {
        get: () => new FlagList(Object.entries(flags))
    });

    Object.defineProperty(Game, 'roomList', {
        get: () => new RoomList(Object.entries(rooms))
    });

    Object.defineProperty(Game, 'spawnList', {
        get: () => new SpawnList(Object.entries(spawns))
    });

}

module.exports = {
    proto
};