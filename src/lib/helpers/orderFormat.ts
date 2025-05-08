export const ordersNumberParser = ([price, size]: [string, string]): [
  number,
  number
] => {
  const parsedSize = parseFloat(size) ?? 0;
  const parsedPrice = parseFloat(price) ?? 0;
  return [parsedPrice, parsedSize];
};

export const orderWithTotalFormatter = (orders: [number, number][]) => {
  let total = 0;
  return orders.map(([price, size]) => {
    total += size;
    return [price, size, total];
  });
};

export const formatNumber = (n: number) => {
  return Number(n).toLocaleString("en-US");
};
