function generatePixel(planStack) {

    if (Game.cpu.bucket > 9000) {
        planStack.cooldown = PIXEL_CPU_COST / Game.cpu.limit;
        Game.cpu.generatePixel();
    }

}

module.exports = {
    generatePixel,
    runActivities: require("creepActivity").runActivities
};