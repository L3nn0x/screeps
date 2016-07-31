var roleMiner = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var isMining = false;
        if (creep.carry.energy >= 50) {
            var targets = _.filter(creep.pos.findInRange(FIND_CREEPS, 1), (c) => c.id != creep.id).sort(function(a, b) {
                if (a.id == creep.memory.lastGiven)
                    return true;
                return false;
            });
            if (targets.length) {
                creep.transfer(targets[0], RESOURCE_ENERGY);
                creep.memory.lastGiven = targets[0].id;
            } else
                isMining = true;
        } else
            isMining = true;
	    if(isMining && creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
	}
};

module.exports = roleMiner;
