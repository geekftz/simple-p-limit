const pLimit = (maxNum) => {
  const queue = [];
  let activeCount = 0;

  const next = () => {
    activeCount--;

    if (queue.length > 0) {
      queue.shift()();
    }
  };

  const run = async (fn, resolve, ...args) => {
    console.log("🚀 --> run --> resolve:", resolve);
    console.log("🚀 --> run --> fn:", fn);
    activeCount++;

    const result = (async () => fn(...args))();

    // resolve(result);

    try {
      const res = await result;
      resolve(res);
    } catch (err) {}

    next();
  };

  const enqueue = (fn, resolve, ...args) => {
    queue.push(run.bind(null, fn, resolve, ...args));

    if (activeCount < maxNum && queue.length > 0) {
      queue.shift()();
    }
  };

  const generator = (fn, ...args) => {
    return new Promise((resolve) => {
      enqueue(fn, resolve, ...args);
    });
  };

  return generator;
};

const limit = pLimit(2);

function asyncFun(value, delay) {
  return new Promise((resolve) => {
    console.log("start " + value);
    setTimeout(() => resolve(value), delay);
  });
}

(async function () {
  const arr = [
    limit(() => asyncFun("aaa", 2000)),
    limit(() => asyncFun("bbb", 3000)),
    limit(() => asyncFun("ccc", 1000)),
    limit(() => asyncFun("ddd", 1000)),
    limit(() => asyncFun("eee", 1000)),
    // asyncFun("aaa", 2000),
    // asyncFun("bbb", 3000),
    // asyncFun("ccc", 1000),
    // asyncFun("ddd", 1000),
    // asyncFun("eee", 1000),
  ];

  const result = await Promise.all(arr);
  console.log(result);
})();
