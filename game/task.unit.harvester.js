const util      = require("util");
const constants = util.constants;
const activity  = require("creepActivity");

function prepareBuild(room) {

    const harvester = room.creeps.harvester;

    if (harvester.size !== 0) {
        return false;
    }

    let roomIsSpawning = false;
    let richestSpawn   = null;

    room.spawns.forEach(spawn => {

        if (spawn.spawning) {
            roomIsSpawning = true;
            return false;
        }

        const capacity = spawn.store.getUsedCapacity(RESOURCE_ENERGY);
        if (richestSpawn === null || (capacity >= 300 && richestSpawn.store.getUsedCapacity(RESOURCE_ENERGY) < capacity)) {
            richestSpawn = spawn;
        }

    });

    if (roomIsSpawning || richestSpawn === null) {
        return false;
    }

    const spawnBudget = richestSpawn.store.getUsedCapacity(RESOURCE_ENERGY);

    const bodyPartBalances = [
        util.bodyPartCalculator.createBodyPartBalanceItem(WORK, 1),
        util.bodyPartCalculator.createBodyPartBalanceItem(CARRY, 2),
        util.bodyPartCalculator.createBodyPartBalanceItem(MOVE, 2)
    ];

    if (!util.bodyPartCalculator.canCalculateBodyParts(bodyPartBalances, spawnBudget)) {
        return;
    }

    const bodyParts = util.bodyPartCalculator.calculateBodyParts(
        bodyPartBalances,
        spawnBudget
    );

    const name          = `harvester_${util.getUniqueHash()}`;
    const dryRunResult  = richestSpawn.spawnCreep(bodyParts, name, {dryRun: true});

    if (dryRunResult !== OK) {
        console.log('error perapring build harvester!', dryRunResult, bodyParts, richestSpawn)
    }

    return {
        spawn: richestSpawn,
        bodyParts,
        name
    };

}

function build() {

    MyGame.rooms.forEach(room => {

        const preparedBuild = prepareBuild(room);

        if (!preparedBuild) {
            return;
        }

        const result = preparedBuild.spawn.spawnCreep(preparedBuild.bodyParts, preparedBuild.name, {
            memory: {
                [util.constants.MEMORY_CREEP_TYPE]: util.constants.CREEP_HARVESTER
            }
        });

        if (result !== OK) {
            console.log('error build harvester!', result, preparedBuild);
        }

    });

}

function findClosestResource(creep) {

    if (!creep.memory[constants.MEMORY_CREEP_RESOURCE]) {
        const resource = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        creep.memory[constants.MEMORY_CREEP_RESOURCE] = resource.id;
    }

    return Game.getObjectById(creep.memory[constants.MEMORY_CREEP_RESOURCE]);

}

function startActivity(creep) {

    if (!creep.activity.lastActivity || creep.activity.lastActivity === constants.CREEP_ACTIVITY_TRANSFER) {
        if (creep.store.getUsedCapacity() === 0) {
            activity.startMovingTo(creep, findClosestResource(creep));
        }
    }

}

function work() {

    MyGame.creeps.harvester.forEach(harvester => {

        if (harvester.activity.hasActivity) {
            return;
        }

        startActivity(harvester);

    });

}

module.exports = {
    build,
    work
};