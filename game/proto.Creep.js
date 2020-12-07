const constants = require("constants");

class CreepList extends Map {
    add(creep) {
        this.set(creep.name, creep)
    }
    get harvester() {
        return new CreepList(this.entries().filter(([,creep]) => creep.isHarvester));
    }
}

function proto() {

    Object.defineProperty(Creep.prototype, 'type', {
        get: function() {
            return this.memory[constants.MEMORY_CREEP_TYPE];
        },
        set: function(type) {
            this.memory[constants.MEMORY_CREEP_TYPE] = type;
        }
    });

    Object.defineProperty(Creep.prototype, 'isHarvester', {
        get: function() {
            return this.memory[constants.MEMORY_CREEP_TYPE] === constants.CREEP_HARVESTER;
        }
    });

}

module.exports = {
    proto,
    CreepList
};