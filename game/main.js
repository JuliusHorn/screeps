const scheduler = require("scheduler");
const util      = require("util");

//test
module.exports.loop = function () {

    //seems like the runtime can be execute on the same shard, and the runtime Vars will be kept.
    //problem is: Objects like: room, spawn etc are new builds (have new references)
    //so all reference Maps are broken at this time
    util.clearTickCache();

    scheduler.run();

};