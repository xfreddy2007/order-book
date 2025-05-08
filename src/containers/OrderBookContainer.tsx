import OrderBook from "@/components/OrderBook";
import {
  ordersNumberParser,
  orderWithTotalFormatter,
} from "@/lib/helpers/orderFormat";
import useBTSEOrderBook from "@/lib/hooks/useBTSEOrderBook";
import React, { useEffect, useRef, useState } from "react";

const OrderBookContainer: React.FC = () => {
  const { bids, asks } = useBTSEOrderBook("BTCPFC");

  // Middle price ref
  const midPriceRef = useRef<number>(0);

  const [isPriceGoingUp, setIsPriceGoingUp] = useState<boolean>(false);

  const buyOrdersWithTotal = orderWithTotalFormatter(
    [...bids].map(ordersNumberParser).sort((a, b) => b.price - a.price)
  ).slice(0, 8);
  const sellOrdersWithTotal = orderWithTotalFormatter(
    [...asks].map(ordersNumberParser).sort((a, b) => a.price - b.price)
  ).slice(0, 8);

  const maxTotal = Math.max(
    ...buyOrdersWithTotal.map(({ total }) => total),
    ...sellOrdersWithTotal.map(({ total }) => total)
  );

  const midPrice = ((+bids[0]?.price + +asks[0]?.price) / 2).toFixed(1);

  useEffect(() => {
    if (midPriceRef.current !== null) {
      setIsPriceGoingUp(midPriceRef.current < parseFloat(midPrice));
      midPriceRef.current = parseFloat(midPrice);
    }
  }, [midPrice]);

  return (
    <OrderBook
      buyOrdersWithTotal={buyOrdersWithTotal}
      sellOrdersWithTotal={sellOrdersWithTotal}
      midPrice={midPrice}
      maxTotal={maxTotal}
      isPriceGoingUp={isPriceGoingUp}
    />
  );
};

export default OrderBookContainer;
