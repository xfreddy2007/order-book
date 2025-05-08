type Order = {
  price: number;
  size: number;
  isNewPrice: boolean;
};

type OrderWithTotal = Order & { total: number };

export const ordersNumberParser = ([price, size, isNewPrice]: [
  string,
  string,
  boolean
]): {
  price: number;
  size: number;
  isNewPrice: boolean;
} => {
  const parsedSize = parseFloat(size) ?? 0;
  const parsedPrice = parseFloat(price) ?? 0;
  return { price: parsedPrice, size: parsedSize, isNewPrice };
};

export const orderWithTotalFormatter = (orders: Order[]): OrderWithTotal[] => {
  let total = 0;
  return orders.map(({ price, size, isNewPrice }) => {
    total += size;
    return { price, size, total, isNewPrice };
  });
};

export const formatNumber = (n: number) => {
  return Number(n).toLocaleString("en-US");
};
