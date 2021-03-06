function schedule(
    module,
    task,
    {
        tick = 1,
        consumeBucket = false,
    } = {}
) {
    return {
        module,
        task,
        tick,
        modifier: {
            tick,
            consumeBucket
        }
    };
}

module.exports.plans = [
    schedule('unit.harvester', 'build', {tick: 10}),
    schedule('unit.harvester', 'work', {tick: 3}),
    schedule('stuff', 'runActivities', {tick: 1}),
    schedule('cleanupMemory', 'general', {tick: 30}),
    schedule('stuff', 'generatePixel', {tick: 50}),
]