var constants = require("constants");

var roleHarvester = {
  getBody: function(energy) {
      var work = Math.floor(energy / (3 * constants.bodyParts.WORK.cost));
      if (work == 0)
        work = 1;
      var move = work;
      var tmp = energy - work * constants.bodyParts.WORK.cost - move * constants.bodyParts.MOVE.cost;
      var carry = Math.floor(tmp / (2 * constants.bodyParts.CARRY.cost));
      if (carry == 0)
        carry = 1;
      move += carry;
      while (work * constants.bodyParts.WORK.cost + carry * constants.bodyParts.CARRY.cost + move * constants.bodyParts.MOVE.cost > energy) {
        if (carry > 1)
          carry -= 1;
        else if (work > 1)
          work -= 1;
        move -=1;
      }
      console.log(work, carry, move);
      var res = [];
      for (var i = 0; i < work; i++)
        res.push(WORK);
      for (var i = 0; i < move; i++)
        res.push(MOVE);
      for (var i = 0; i < carry; i++)
        res.push(CARRY);
      return res;
  },
  getRoles: function() {
    return {
      idle: function(creep) {
        console.log("harvester::idle " + creep.name);
      },
      moving: function(creep) {
        console.log("harvester::moving " + creep.name);
      },
      acting: function(creep) {
        console.log("harvesting::acting " + creep.name);
      }
    };
  },
  run: function(creep) {
    console.log("harvester::run " + creep.name);
  }
};
module.exports = roleHarvester;
