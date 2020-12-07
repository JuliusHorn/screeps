const util = require("util");

function prepareBuild(room) {

    console.log(Memory.creeps);

    const harvester = util.filterCreepType(
        util.getRoomCreeps(room),
        util.constants.CREEP_HARVESTER
    );

    if (harvester.length !== 0) {
        return false;
    }

    console.log('building harvester!', harvester.length);

    let roomIsSpawning = false;
    let richestSpawn   = null;

    util.getRoomSpawns(room).forEach(spawn => {

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

    const name          = `harvester_${Game.time}_${Math.random()}`;
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

function build(preparedBuild) {

    Object.values(Game.rooms).forEach(room => {

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

function work() {

    util.filterCreepType(Object.values(Game.creeps), util.constants.CREEP_HARVESTER).forEach(harvester => {

        const target = harvester.pos.findClosestByPath(FIND_SOURCES_ACTIVE);

        harvester.moveTo(target, {reusePath: 5});
        harvester.harvest(target);

    });

}

module.exports = {
    build,
    work
};