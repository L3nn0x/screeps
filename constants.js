module.exports = {
  roles: {
    HARVESTER: "harvester",
  },
  bodyParts: {
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
};
