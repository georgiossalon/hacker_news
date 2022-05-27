// eslint-disable-next-line import/prefer-default-export
export const forEachAsync = (arr: any, fn: any) =>
  arr.reduce(
    (promise: any, value: any) => promise.then(() => fn(value)),
    Promise.resolve(),
  );
