var roles = {
  HARVESTER: 'harvester',
}

var bodyParts = {
  MOVE: {
    cost: 50,
    fatigue: -2
  },
  WORK: {
    cost: 100,
    harvest: {
      energy: 2,
      mineral: 1
    },
    build: {
      gain: 5,
      cost: 5
    },
    upgrade: 1
  },
  CARRY: {
    cost: 50,
    carry: 50,
  }
}

var _roles = {
  roles.HARVESTER: require("role.harvester")
};

module.exports = {
  build: function(role, energy) {
    var StateMachine = require("StateMachine");
    var fsm = StateMachine.create({
      initial: 'idle',
      events: [
        { name: 'move', from: ['idle', 'acting'], to: 'moving' },
        { name: 'action', from: ['idle', 'moving'], to: 'acting' },
        { name: 'stop', from: ['moving', 'acting'], to: 'idle' }
      ],
      callbacks: {
        onidle: function(event, from, to, creep) {
          console.log("onidle " + screep.name);
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
    return {body: roles[role].getBody(energy),
            memory: {
              fsm: fsm;
              roles: roles[role].getRoles();
              role: role;
            }
          };
    },
  run: function(creep) {
    _roles[creep.memory.role].run(creep);
  }
}
