const constants          = require("constants");
const bodyPartCalculator = require("util.bodyPartCalculator");

function hashNumber(number) {
    return number.toString(36);
}

function getUniqueHash() {

    let counter = Memory.counter || -1;
    counter++;
    Memory.counter = counter;

    return hashNumber(counter);

}

module.exports = {
    getUniqueHash,
    hashNumber,
    constants,
    bodyPartCalculator
};