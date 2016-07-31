var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep, emergency) {
	    if(creep.carry.energy < creep.carryCapacity) {
            var pickups = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY, {
                    filter: (energy) => energy > 20
                    });
            if (pickups) {
                if (creep.pickup(pickups) == ERR_NOT_IN_RANGE)
                    creep.moveTo(pickups);
            } else {
                var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner' && !creep.spawning);
                if (miners.length && !emergency)
                    creep.moveTo(miners[0]);
                else {
                    var storage = _.filter(Game.structures, (struct) => struct.structureType == STRUCTURE_STORAGE)[0];
                    if (storage.store[RESOURCE_ENERGY] > 10000)
                        creep.moveTo(storage);
                    else {
                        var source = creep.pos.findClosestByRange(FIND_SOURCES);
                        if (creep.harvest(source) == ERR_NOT_IN_RANGE)
                            creep.moveTo(source);
                    }
                }
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) &&
                            structure.energy < structure.energyCapacity) || (structure.structureType == STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] < structure.storeCapacity);
                    }
            }).sort(function(a, b) {
                var Acapacity = a.energyCapacity;
                var Bcapacity = b.energyCapacity;
                if (a.structureType == STRUCTURE_STORAGE)
                    Acapacity = a.storeCapacity;
                if (b.structureType == STRUCTURE_STORAGE)
                    Bcapacity = b.storeCapacity;
                return +Acapacity - +Bcapacity;
            });
            if(targets.length) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                    creep.moveTo(targets[0]);
            } else
                creep.moveTo(Game.spawns.Spawn1);
        }
	}
};

module.exports = roleHarvester;
