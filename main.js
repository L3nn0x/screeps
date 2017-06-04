var creepBuilder = require("creepBuilder");

var buildCreep(spwan, role, id, energy) {
  var params = creepBuilder.build(role, energy);
  var name = role + str(id);
  Game.spawns[spawn].createCreep(params.body, name, params.memory);
}

module.exports.loop = function () {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }

    if (_.filter(Game.creeps, (creep) => creep.memory.role == roles.HARVESTER).size == 0)
      buildCreep(Game.spawns['Spawn1'], roles.HARVESTER, Game.spawns['Spawn1'].energy);

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        creepBuilder.run(creep);
    }
}
