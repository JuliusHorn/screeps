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
    schedule('unit.harvester', 'build', {tick: 3}),
    schedule('unit.harvester', 'work', {tick: 5}),
    schedule('cleanupMemory', 'general', {tick: 30}),
]