constants = require("constants");

var _roles = {};
_roles[constants.roles.HARVESTER] = require("role.harvester");

module.exports = {
  build: function(role, energy) {
    var StateMachine = require("state-machine");
    var fsm = StateMachine.create({
      initial: 'idle',
      events: [
        { name: 'move', from: ['idle', 'acting'], to: 'moving' },
        { name: 'action', from: ['idle', 'moving'], to: 'acting' },
        { name: 'stop', from: ['moving', 'acting'], to: 'idle' }
      ],
      callbacks: {
        onidle: function(event, from, to, creep) {
          if (creep == null)
            return;
          console.log("onidle " + creep.name);
          creep.memory.roles['idle'](creep);
        },
        onmoving: function(event, from, to, creep) {
          console.log("onmoving " + creep.name);
          creep.memory.roles['moving'](creep);
        },
        onacting: function(event, from, to, creep) {
          console.log("onacting " + creep.name);
          creep.memory.roles['acting'](creep);
        }
      }
    });
    return {body: _roles[role].getBody(energy),
            memory: {
              fsm: fsm,
              roles: _roles[role].getRoles(),
              role: role,
            }
          };
    },
  run: function(creep) {
    _roles[creep.memory.role].run(creep);
  }
};
