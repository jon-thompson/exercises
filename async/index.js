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

  parallel(thunks) {
    return function (finalCallback) {
      const data = Array(thunks.length);
      let completedThunks = 0;

      function processThunk(thunk, index) {
        thunk((error, thunkData) => {
          data[index] = thunkData;
          completedThunks++;

          if (completedThunks === thunks.length) {
            finalCallback(null, data);
          }
        });
      }

      thunks.forEach(processThunk);
    };
  },
};
