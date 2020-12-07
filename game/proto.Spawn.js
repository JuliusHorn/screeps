class SpawnList extends Map {
    add(spawn) {
        this.set(spawn.name, spawn)
    }
}

function proto() {

}

module.exports = {
    proto,
    SpawnList
};