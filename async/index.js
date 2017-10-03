module.exports = {
  sequence(thunks) {
    return function (finalCallback) {
      thunks[0]((e, data) => {
        thunks[1](finalCallback, data);
      });
    };
  },
};
