var roles = {
    "harvester" : require('role.harvester'),
    "upgrader" : require('role.upgrader'),
    "builder" : require('role.builder'),
    "miner" : require('role.miner'),
    "heavyUpgrader" : require("role.heavyUpgrader"),
}

module.exports.loop = function () {
    return;
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }

    var hostiles = 0; //Game.rooms["E28S39"].find(FIND_HOSTILE_CREEPS);

    var towers = _.filter(Game.structures, (struct) => struct.structureType == STRUCTURE_TOWER);
    for (var tower of towers) {
        if (!hostiles.length) {
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
               filter: (structure) => structure.hits < 20000 && structure.hits < structure.hitsMax
          });
            if(closestDamagedStructure) {
                tower.repair(closestDamagedStructure);
            }
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner').length;
    var storage = _.filter(Game.structures, (struct) => struct.structureType == STRUCTURE_STORAGE)[0];
    var closestHarvester = _.filter(storage.pos.findInRange(FIND_CREEPS, 1), (c) => c.memory.role == "harvester");
    if ((hostiles.length || !miners) && closestHarvester.length && storage.store[RESOURCE_ENERGY])
        storage.transfer(closestHarvester[0], RESOURCE_ENERGY);

    var energyToFill = _.sum(_.filter(Game.structures, (struct) => (struct.structureType == STRUCTURE_EXTENSION || struct.structureType == STRUCTURE_SPAWN || struct.structureType == STRUCTURE_TOWER) &&
                            struct.energy < struct.energyCapacity), function(a) { return a.energy; });
    var totalEnergyToFill = _.sum(_.filter(Game.structures, (struct) => (struct.structureType == STRUCTURE_EXTENSION || struct.structureType == STRUCTURE_SPAWN || struct.structureType == STRUCTURE_TOWER) &&
                            struct.energy < struct.energyCapacity), function(a) { return a.energyCapacity; });
    var toBuild = Object.keys(Game.constructionSites).length;
    energyToFill = energyToFill < 2 * totalEnergyToFill / 3 ? 2 : 1;
    toBuild = toBuild == 0 ? 0 : toBuild < 3 ? 1 : 2;
    if(_.filter(Game.creeps, (creep) => creep.memory.role == 'harvester').length < energyToFill)
        Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE, MOVE, MOVE], {role: 'harvester'});
    else if(miners && _.filter(Game.creeps, (creep) => creep.memory.role == 'builder').length < toBuild)
        Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, MOVE, MOVE, MOVE], {role: 'builder'});
    else if(miners && _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader').length < 1)
        Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE, MOVE, MOVE], {role: 'upgrader'});
    else if (miners < 1)
        Game.spawns.Spawn1.createCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE], {role:"miner"});
    else if (miners && _.filter(Game.creeps, (creep) => creep.memory.role == 'heavyUpgrader').length < 1)
        Game.spawns.Spawn1.createCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], {role:"heavyUpgrader"});
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (roles.hasOwnProperty(creep.memory.role))
            roles[creep.memory.role].run(creep, hostiles.length > 0);
    }
}
