"use client";
import React, { useState, useEffect, useRef } from "react";
import useBTSEOrderBook, { type OrderBook } from "@/lib/hooks/useBTSEOrderBook";
import { ArrowUp } from "lucide-react";
import classNames from "classnames";
import {
  formatNumber,
  ordersNumberParser,
  orderWithTotalFormatter,
} from "@/lib/helpers/orderFormat";

type OrderBookProps = {
  symbol?: string;
};

const OrderBook: React.FC<OrderBookProps> = ({ symbol = "BTCPFC" }) => {
  const { bids, asks } = useBTSEOrderBook(symbol);

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

  const midPrice = ((+bids[0]?.[0] + +asks[0]?.[0]) / 2).toFixed(1);

  useEffect(() => {
    if (midPriceRef.current !== null) {
      setIsPriceGoingUp(midPriceRef.current < parseFloat(midPrice));
      midPriceRef.current = parseFloat(midPrice);
    }
  }, [midPrice]);

  if (!bids || !asks || bids.length === 0 || asks.length === 0) {
    return (
      <div className="text-center text-gray-500 w-[280px] h-[450px] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-[#131B29] text-[#F0F4F8] py-4 px-2 rounded-md w-[280px] text-sm">
      <h2 className="text-base font-bold pb-2">Order Book</h2>
      <div className="flex justify-between text-[#8698aa] pb-1">
        <div className="w-[30%]">Price (USD)</div>
        <div className="w-[30%] text-right">Size</div>
        <div className="w-[40%] text-right">Total</div>
      </div>

      {/* Sells */}
      <div className="space-y-0.5">
        {sellOrdersWithTotal
          .reverse()
          .map(({ price, size, total, isNewPrice }, i) => (
            <div
              key={`ask-${i}`}
              className="relative flex justify-between px-1 font-bold hover:bg-[#1E3059]"
            >
              <div
                className={classNames(
                  "absolute right-0 top-0 bottom-0 bg-[#ff5a5a1f] opacity-30",
                  isNewPrice && "transition-all duration-100 bg-[#ff5a5a1f]"
                )}
                style={{ width: `${(total / maxTotal) * 100}%` }}
              />
              <div className="w-[30%] text-[#FF5B5A]">
                {formatNumber(price)}
              </div>
              <div className="w-[30%] text-right">{formatNumber(size)}</div>
              <div className="w-[40%] text-right">{formatNumber(total)}</div>
            </div>
          ))}
      </div>

      {/* Mid Price */}
      <div
        className={classNames(
          "flex items-center justify-center my-1 font-bold text-lg",
          isPriceGoingUp ? "text-[#00b15d]" : "text-[#FF5B5A]",
          isPriceGoingUp ? "bg-[#10ba681f]" : "bg-[#ff5a5a1f]"
        )}
      >
        {midPrice}{" "}
        <ArrowUp
          className={classNames(
            "w-4 h-4 ml-1",
            isPriceGoingUp ? "rotate-0" : "rotate-180"
          )}
        />
      </div>

      {/* Buys */}
      <div className="space-y-0.5">
        {buyOrdersWithTotal.map(({ price, size, total, isNewPrice }, i) => (
          <div
            key={`bid-${i}`}
            className="relative flex justify-between px-1 font-bold hover:bg-[#1E3059]"
          >
            <div
              className={classNames(
                "absolute right-0 top-0 bottom-0 bg-[#10ba681f] opacity-30",
                isNewPrice && "transition-all duration-100 bg-[#10ba681f]"
              )}
              style={{ width: `${(total / maxTotal) * 100}%` }}
            />
            <div className="w-[30%] text-[#00b15d]">{formatNumber(price)}</div>
            <div className="w-[30%] text-right">{formatNumber(size)}</div>
            <div className="w-[40%] text-right">{formatNumber(total)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderBook;
