var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
        }

        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            } else {
                var closestDamagedStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => structure.hits < 20000 && structure.hits < structure.hitsMax
                    });
                if (creep.repair(closestDamagedStructure) == ERR_NOT_IN_RANGE)
                    creep.moveTo(closestDamagedStructure);
            }
        }
        else {
            var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
            if (miners.length)
                creep.moveTo(miners[0]);
            else {
                var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => structure.structureType == STRUCTURE_CONTAINER
                });
                creep.moveTo(container);
            }
        }
    }
};

module.exports = roleBuilder;
