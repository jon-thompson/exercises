module.exports = {
  sequence(thunks) {
    return function (finalCallback) {
      function processThunk(index, data = null) {
        const thunk = thunks[index];
        const nextIndex = index + 1;
        const isLastThunk = nextIndex === thunks.length;
        const callback = isLastThunk ? finalCallback : (e, nextData) => processThunk(nextIndex, nextData);

        thunk(callback, data);
      }

      processThunk(0);
    };
  },
};
