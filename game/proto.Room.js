const {SpawnList} = require("proto.Spawn");
const {CreepList} = require("proto.Creep");

class RoomList extends Map {}

function proto() {

    Object.defineProperty(Room.prototype, 'creeps', {
        get: function() {
            return MyGame.tickCache('roomXCreeps', () => {

                const roomXCreeps = new Map();

                MyGame.creeps.forEach(creep => {

                    let creepList = roomXCreeps.get(creep.room);

                    if (!creepList) {
                        creepList = new CreepList();
                        roomXCreeps.set(creep.room, creepList);
                    }

                    creepList.add(creep);

                });

                return roomXCreeps;

            }).get(this) || new CreepList();
        }
    });

    Object.defineProperty(Room.prototype, 'spawns', {
        get: function() {
            return MyGame.tickCache('roomXSpawns', () => {

                const roomXSpawns = new Map();

                MyGame.spawns.forEach(spawn => {

                    let spawnList = roomXSpawns.get(spawn.room);

                    if (!spawnList) {
                        spawnList = new SpawnList();
                        roomXSpawns.set(spawn.room, spawnList);
                    }

                    spawnList.add(spawn);

                });

                return roomXSpawns;

            }).get(this) || new SpawnList();
        }
    });

}

module.exports = {
    proto,
    RoomList
};