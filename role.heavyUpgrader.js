var roleHeavyUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.carry.energy === 0)
            creep.memory.isHarvesting = true;
        if(creep.carry.energy < creep.carryCapacity && creep.memory.isHarvesting) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1]);
            }
        } else if (creep.carry.energy === creep.carryCapacity)
            creep.memory.isHarvesting = false;
        if (!creep.memory.isHarvesting) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    }
};

module.exports = roleHeavyUpgrader;
