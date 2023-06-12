const data = [1, 2, [3, 4, [5, 6]]];

const recursiveSimpleFlat = (data) => {
  const result = [];

  data.forEach((item) => {
    const flattedItem =
      item instanceof Array ? recursiveSimpleFlat(item) : [item];
    result.push(...flattedItem);
  });

  return result;
};
const recursiveFlat = (data, maxDeep = Infinity, curDeep = 1) => {
  if (curDeep > maxDeep) return data;

  const result = [];

  data.forEach((item) => {
    const flattedItem =
      item instanceof Array
        ? recursiveFlat(item, maxDeep, curDeep + 1)
        : [item];
    result.push(...flattedItem);
  });

  return result;
};

const recursiveSimpleReduceFlat = (data) =>
  data.reduce(
    (acc, cur) =>
      cur instanceof Array
        ? [...acc, ...recursiveSimpleReduceFlat(cur)]
        : [...acc, cur],
    []
  );
const recursiveReduceFlat = (data, maxDeep = Infinity, curDeep = 1) =>
  data.reduce(
    (acc, cur) =>
      cur instanceof Array && curDeep <= maxDeep
        ? [...acc, ...recursiveReduceFlat(cur, maxDeep, curDeep + 1)]
        : [...acc, cur],
    []
  );

const stackSimpleFlat = (data) => {
  const stack = [...data];
  const result = [];

  while (stack.length > 0) {
    const item = stack.pop();
    if (item instanceof Array) {
      stack.push(...item);
    } else {
      result.push(item);
    }
  }

  return result.reverse();
};
const stackFlat = (data, maxDeep = Infinity) => {
  const stack = [...data];
  const result = [];
  let currentDeep = 1;

  while (stack.length > 0) {
    const item = stack.pop();
    if (item instanceof Array && currentDeep <= maxDeep) {
      currentDeep += 1;
      stack.push(...item);
    } else {
      result.push(item);
    }
  }

  return result.reverse();
};

recursiveSimpleFlat(data); //?
recursiveSimpleReduceFlat(data); //?
recursiveReduceFlat(data, 1); //?
recursiveFlat(data, 1); //?
stackSimpleFlat([1, [2, [3, 4]]]); //?
