import { OrderBookQuote, HighlightType } from "@/lib/hooks/useBTSEOrderBook";

export type ParsedOrderBookQuote = {
  price: number;
  size: number;
  highlightType?: HighlightType;
};

export type OrderWithTotal = ParsedOrderBookQuote & { total: number };

export const ordersNumberParser = ({
  price,
  size,
  highlightType,
}: OrderBookQuote): {
  price: number;
  size: number;
  highlightType?: HighlightType;
} => {
  const parsedSize = parseFloat(size) ?? 0;
  const parsedPrice = parseFloat(price) ?? 0;
  return { price: parsedPrice, size: parsedSize, highlightType };
};

export const orderWithTotalFormatter = (
  orders: ParsedOrderBookQuote[]
): OrderWithTotal[] => {
  let total = 0;
  return orders.map(({ price, size, highlightType }) => {
    total += size;
    return { price, size, total, highlightType };
  });
};

export const formatNumber = (n: number) => {
  return Number(n).toLocaleString("en-US");
};
