import pLimit from "p-limit";

const limit = pLimit(1);

const fetchSomething = function (name) {
  return new Promise(function (resolve) {
    // 异步逻辑 1...
    setTimeout(() => {
      console.log("🚀 --> setTimeout --> name:", name);
      resolve(name);
    }, 1000);
  });
};

const doSomething = function () {
  return new Promise(function (resolve) {
    // 异步逻辑 2...
    setTimeout(() => {
      resolve("do something");
    }, 0);
  });
};

const input = [
  limit(() => fetchSomething("foo")),
  limit(() => fetchSomething("bar")),
  limit(() => doSomething()),
];

const test = async () => {
  const result = await Promise.all(input);

  console.log(result);
};

test();
