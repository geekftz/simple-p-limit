const promise1 = () => {
  return new Promise(function (resolve) {
    // 异步逻辑 1...
    setTimeout(() => {
      resolve(1);
    }, 1000);
  });
};

const a = async () => {
  return promise1();
};

const run = function (resolve) {
  const test = async () => {
    const result = (async () => {
      return promise1();
    })();

    resolve(result);

    try {
      const res = await result;
    } catch (err) {}
  };

  test();
};

const promise2 = () => {
  return new Promise(function (resolve) {
    run(resolve);
  });
};

promise2().then((res) => {
  console.log("🚀 --> promise2 --> res:", res);
});
