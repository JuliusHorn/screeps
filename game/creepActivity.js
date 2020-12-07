const util      = require("util");
const constants = util.constants;

function move(creep) {

    const res = {};

    const target = Game.getObjectById(creep.activity.payload[constants.CREEP_ACTIVITY_PAYLOAD_TARGET]);

    if (!creep.pos.isEqualTo(target)) {
        creep.moveTo(
            target,
            {reusePath: 5}
        );
    } else {
        res.done = true;
    }

    return res;

}

function startMovingTo(creep, target) {
    creep.activity.startActivity(
        constants.CREEP_ACTIVITY_MOVE,
        {
            [constants.CREEP_ACTIVITY_PAYLOAD_TARGET]: target.id
        }
    )
}

const activityMap = {
    [constants.CREEP_ACTIVITY_MOVE]: move
};

function runActivity(creep) {

    const res = activityMap[creep.activity.type](creep);

    if (res && res.done) {
        creep.activity.activityDone();
    }

}

function runActivities() {

    MyGame.creeps.forEach(creep => {
        if (creep.activity.hasActivity) {
            runActivity(creep);
        }
    });

}

module.exports = {
    startMovingTo,
    runActivities
};