const {plans} = require("scheduler.config");

function canExecutePlan(plan) {

    const tick = plan.tick;

    if (Game.time % tick > 0 ) {
        return false;
    }

    return true;

}

function executePlan(plan) {

    const module = require(`task.${plan.module}`);
    module[plan.task]();

}

module.exports.run = function() {

    for (let i = 0; i < plans.length; i++) {

        const plan = plans[i];

        if (canExecutePlan(plan)) {
            executePlan(plan);
        }

    }

}