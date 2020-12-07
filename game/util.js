const constants = require("constants");

const roomSpawnAssociation = new Map();
roomSpawnAssociation.initialized = false;
function getRoomSpawns(room) {

    if (!roomSpawnAssociation.initialized) {

        roomCreepAssociation.initialized = true;

        Object.values(Game.spawns).forEach(spawn => {

            let spawnList = roomSpawnAssociation.get(spawn.room);

            if (!spawnList) {
                spawnList = [];
                roomSpawnAssociation.set(spawn.room, spawnList);
            }

            spawnList.push(spawn);

        });

    }



    return roomSpawnAssociation.get(room) || [];

}

const roomCreepAssociation = new Map();
roomCreepAssociation.initialized = false;
function getRoomCreeps(room) {

    if (!roomCreepAssociation.initialized) {

        roomCreepAssociation.initialized = true;

        Object.values(Game.creeps).forEach(creep => {

            let creepList = roomCreepAssociation.get(creep.room);

            if (!creepList) {
                creepList = [];
                roomCreepAssociation.set(creep.room, creepList);
            }

            creepList.push(creep);

        });

    }

    return roomCreepAssociation.get(room) || [];

}

function filterCreepType(creeps, type) {
    return creeps.filter(creep => creep.memory[constants.MEMORY_CREEP_TYPE] === type);
}

module.exports = {
    getRoomSpawns,
    getRoomCreeps,
    filterCreepType,
    bodyPartCalculator: require("util.bodyPartCalculator"),
    constants
};