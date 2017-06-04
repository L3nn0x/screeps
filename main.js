var creepBuilder = require("creepBuilder");
var constants = require("constants");

var buildCreep = function(spawn, role, id, energy) {
  var params = creepBuilder.build(role, energy);
  var name = role + id;
  spawn.createCreep(params.body, name, params.memory);
};

module.exports.loop = function () {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }

    if (_.filter(Game.creeps, (creep) => creep.memory.role == constants.roles.HARVESTER).length == 0)
      buildCreep(Game.spawns['Spawn1'], constants.roles.HARVESTER, 1, Game.spawns['Spawn1'].energy);

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        creepBuilder.run(creep);
    }
};
