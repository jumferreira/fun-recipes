export function createFactory(fn) {
  return function (options = {}) {
    const defaults = {
      props: {},
      store: {},
      options: {},
    };
    const params = { ...defaults, ...options };
    return fn(params);
  };
}
