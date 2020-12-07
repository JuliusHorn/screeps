const util    = require("util");
const {plans} = require("scheduler.config");

function canExecutePlan(plan) {

    plan.id = `${plan.module}_${plan.task}`;

    if (Memory[util.constants.MEMORY_COOLDOWN][plan.id]) {
        if (Memory[util.constants.MEMORY_COOLDOWN][plan.id] <= Game.time) {
            delete Memory[util.constants.MEMORY_COOLDOWN][plan.id];
        } else {
            return false;
        }
    }

    const tick = plan.tick;

    if (Game.time % tick > 0 ) {
        return false;
    }

    return true;

}

function executePlan(plan) {

    const planStack = {plan};

    const module = require(`task.${plan.module}`);
    module[plan.task](planStack);

    if (planStack.cooldown) {
        Memory[util.constants.MEMORY_COOLDOWN][plan.id] = Game.time + planStack.cooldown;
    }

}

module.exports.run = function() {

    if (!Memory[util.constants.MEMORY_COOLDOWN]) {
        Memory[util.constants.MEMORY_COOLDOWN] = {};
    }

    for (let i = 0; i < plans.length; i++) {

        const plan = plans[i];

        if (canExecutePlan(plan)) {
            executePlan(plan);
        }

    }

}