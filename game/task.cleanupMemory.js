module.exports.general = function() {

    //cleanup creep Memory
    Object.keys(Memory.creeps).forEach(creepName => {
        if (!Game.creeps[creepName]) {
            delete Memory.creeps[creepName];
        }
    });

    //cleanup spawn Memory
    Object.keys(Memory.spawns).forEach(spawnName => {
        if (!Game.spawns[spawnName]) {
            delete Memory.spawns[spawnName];
        }
    });

    //cleanup rooms Memory
    Object.keys(Memory.rooms).forEach(roomName => {
        if (!Game.rooms[roomName]) {
            delete Memory.rooms[roomName];
        }
    });

};