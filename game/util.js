const constants = require("constants");

const tickCacheData = {};

function tickCache(id, construct) {

    if (!tickCacheData[id]) {
        tickCacheData[id] = construct();
    }

    return tickCacheData[id];

}

function clearTickCache() {

    if (tickCacheData.tick && tickCacheData.tick === Game.time) {
        return;
    }

    tickCacheData.tick = Game.time;
    tickCacheData.data = {};

}

function getRoomAssociation(room, type) {

    const roomAssociations = tickCache('roomAssociations', () => { return {}});

    if (!roomAssociations[type]) {

        roomAssociations[type] = new Map
        const map = roomAssociations[type];

        Object.values(Game[type]).forEach(typeEntity => {

            let list = map.get(typeEntity.room);

            if (!list) {
                list = [];
                map.set(typeEntity.room, list);
            }

            list.push(typeEntity);

        });

    }

    return roomAssociations[type].get(room) || [];

}

function getRoomSpawns(room) {
    return getRoomAssociation(room, 'spawns');
}

function getRoomCreeps(room) {
    return getRoomAssociation(room, 'creeps');
}

function filterCreepType(creeps, type) {
    return creeps.filter(creep => creep.memory[constants.MEMORY_CREEP_TYPE] === type);
}

function hashNumber(number) {
    return number.toString(36);
}

function getUniqueHash() {

    let counter = Memory.counter || -1;
    counter++;
    Memory.counter = counter;

    return hashNumber(counter);

}


module.exports = {
    getRoomSpawns,
    getRoomCreeps,
    filterCreepType,
    getUniqueHash,
    tickCache,
    clearTickCache,
    hashNumber,
    bodyPartCalculator: require("util.bodyPartCalculator"),
    constants
};