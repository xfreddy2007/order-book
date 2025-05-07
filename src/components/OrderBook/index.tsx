"use client";
import React from "react";
import useBTSEOrderBook, { type OrderBook } from "@/lib/hooks/useBTSEOrderBook";
import { ArrowUp } from "lucide-react";

function formatNumber(n: number) {
  return Number(n).toLocaleString();
}

type OrderBookProps = {
  symbol?: string;
};

const OrderBook: React.FC<OrderBookProps> = ({ symbol = "BTCPFC" }) => {
  const { bids, asks } = useBTSEOrderBook(symbol);

  // Calculate cumulative totals
  const getTotalList = (orders: [string, string][]) => {
    let total = 0;
    return orders.map(([price, size]) => {
      total += parseFloat(size);
      return [parseFloat(price), parseFloat(size), total];
    });
  };

  const bidsWithTotal = getTotalList(
    [...bids].sort(
      (a: [string, string], b: [string, string]) =>
        parseFloat(b[0]) - parseFloat(a[0])
    )
  ).slice(0, 10);
  const asksWithTotal = getTotalList(
    [...asks].sort(
      (a: [string, string], b: [string, string]) =>
        parseFloat(b[0]) - parseFloat(a[0])
    )
  ).slice(0, 10);

  const maxTotal = Math.max(
    ...bidsWithTotal.map(([, , total]) => total),
    ...asksWithTotal.map(([, , total]) => total)
  );

  const midPrice = ((+bids[0]?.[0] + +asks[0]?.[0]) / 2).toFixed(1);

  return (
    <div className="bg-black text-white p-4 rounded-md w-[300px] font-mono text-sm">
      <h2 className="text-center text-lg mb-2">Order Book</h2>
      <div className="flex justify-between text-gray-400 px-1">
        <div className="w-1/3 text-right">Price (USD)</div>
        <div className="w-1/3 text-right">Size</div>
        <div className="w-1/3 text-right">Total</div>
      </div>
      {/* Asks */}
      <div className="space-y-0.5">
        {asksWithTotal.reverse().map(([price, size, total], i) => (
          <div
            key={`ask-${i}`}
            className="relative flex justify-between text-red-400 px-1"
          >
            <div
              className="absolute right-0 top-0 bottom-0 bg-red-800 opacity-30"
              style={{ width: `${(total / maxTotal) * 100}%` }}
            />
            <div className="w-1/3 text-right">{price}</div>
            <div className="w-1/3 text-right">{size}</div>
            <div className="w-1/3 text-right">{formatNumber(total)}</div>
          </div>
        ))}
      </div>

      {/* Mid Price */}
      <div className="text-green-500 flex items-center justify-center my-1 font-semibold">
        {midPrice} <ArrowUp className="w-4 h-4 ml-1" />
      </div>

      {/* Bids */}
      <div className="space-y-0.5">
        {bidsWithTotal.map(([price, size, total], i) => (
          <div
            key={`bid-${i}`}
            className="relative flex justify-between text-green-400 px-1"
          >
            <div
              className="absolute right-0 top-0 bottom-0 bg-green-800 opacity-30"
              style={{ width: `${(total / maxTotal) * 100}%` }}
            />
            <div className="w-1/3 text-right">{price}</div>
            <div className="w-1/3 text-right">{size}</div>
            <div className="w-1/3 text-right">{formatNumber(total)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderBook;
