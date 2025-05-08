"use client";

import { useEffect, useRef, useState } from "react";

export type OrderBook = {
  // The format of the order book is an array of arrays, where each inner array contains:
  // - Price (string)
  // - Size (string)
  // - Boolean indicating if the price does not exist in the order book before (true/false)
  bids: [string, string, boolean][];
  asks: [string, string, boolean][];
};

export default function useBTSEOrderBook(symbol = "BTC-PERP") {
  const socketRef = useRef<WebSocket>(null);
  const [orderBook, setOrderBook] = useState<OrderBook>({ bids: [], asks: [] });

  useEffect(() => {
    const ws = new WebSocket("wss://ws.btse.com/ws/oss/futures");
    socketRef.current = ws;

    ws.onopen = () => {
      const subscribeMsg = {
        op: "subscribe",
        args: [`update:${symbol}`],
      };
      ws.send(JSON.stringify(subscribeMsg));
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.topic && message.data) {
        const { type, bids, asks } = message.data;

        if (type === "snapshot") {
          setOrderBook({ bids, asks });
        } else if (type === "delta") {
          setOrderBook((prev) => {
            const updateSide = (side: string, updates: [string, string][]) => {
              const book = [...prev[side as keyof OrderBook]];
              updates.forEach(([price, size]) => {
                const index = book.findIndex(([p]) => p === price);
                if (size === "0") {
                  if (index !== -1) book.splice(index, 1);
                } else {
                  if (index !== -1) {
                    book[index][1] = size;
                  } else {
                    book.push([price, size, true]);
                  }
                }
              });
              return book;
            };

            return {
              bids: updateSide("bids", bids || []),
              asks: updateSide("asks", asks || []),
            };
          });
        }
      }
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
    };

    return () => {
      ws.close();
    };
  }, [symbol]);

  return orderBook;
}
