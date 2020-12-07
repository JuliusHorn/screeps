//just do it only on import

const creep = require("proto.Creep");
const room  = require("proto.Room");
const spawn = require("proto.Spawn");
const flag  = require("proto.Flag");
const game  = require("proto.Game");

function prototypeOverride() {
    creep.proto();
    room.proto();
    spawn.proto();
    flag.proto();
}

function objectOverride() {
    game.proto();
}

module.exports = {
    prototypeOverride,
    objectOverride
};