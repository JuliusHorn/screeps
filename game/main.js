const scheduler = require("scheduler");
const util      = require("util");
const proto     = require("prototypes");

proto.prototypeOverride();

//test
module.exports.loop = function () {

    proto.objectOverride();

    scheduler.run();

};