const constants = require("constants");

function Activity(creep) {

    Object.defineProperty(this, 'type', {
        get() {
            return creep.memory[constants.MEMORY_CREEP_ACTIVITY];
        }
    });

    Object.defineProperty(this, 'payload', {
        get() {
            return creep.memory[constants.MEMORY_CREEP_ACTIVITY_PAYLOAD];
        }
    });

    Object.defineProperty(this, 'hasActivity', {
        get() {
            return !!this.type;
        }
    });

    Object.defineProperty(this, 'lastActivity', {
        get() {
            return creep.memory[constants.MEMORY_CREEP_LAST_ACTIVITY];
        }
    });

    this.startActivity = function(type, payload = {}) {
        this.activityDone();
        creep.memory[constants.MEMORY_CREEP_ACTIVITY]         = type;
        creep.memory[constants.MEMORY_CREEP_ACTIVITY_PAYLOAD] = payload;
    }

    this.activityDone = function() {
        if (this.hasActivity) {
            creep.memory[constants.MEMORY_CREEP_LAST_ACTIVITY] = this.type;
        }
        delete creep.memory[constants.MEMORY_CREEP_ACTIVITY];
        delete creep.memory[constants.MEMORY_CREEP_ACTIVITY_PAYLOAD];
    }

}

class CreepList extends Map {
    add(creep) {
        this.set(creep.name, creep)
    }
    get harvester() {
        return new CreepList([...this.entries()].filter(([,creep]) => creep.isHarvester));
    }
}

const activity = {};
function proto() {

    Object.defineProperty(Creep.prototype, 'type', {
        get: function() {
            return this.memory[constants.MEMORY_CREEP_TYPE];
        },
        set: function(type) {
            this.memory[constants.MEMORY_CREEP_TYPE] = type;
        }
    });

    Object.defineProperty(Creep.prototype, 'activity', {
        get: function() {
            if (!activity[this.id]) {
                activity[this.id] = new Activity(this);
            }
            return activity[this.id];
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