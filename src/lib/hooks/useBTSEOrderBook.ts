"use client";

import { useEffect, useRef, useState } from "react";

export type HighlightType = "new" | "size-up" | "size-down";

export type OrderBookQuote = {
  price: string;
  size: string;
  highlightType?: HighlightType;
};

type WebSocketMessage = {
  topic?: string;
  data?: {
    type: "snapshot" | "delta";
    bids?: [string, string][];
    asks?: [string, string][];
  };
};

export type priceFormatArray = [string, string, boolean][];

export default function useBTSEOrderBook(symbol = "BTC-PERP") {
  const socketRef = useRef<WebSocket>(null);
  const [bids, setBids] = useState<OrderBookQuote[]>([]);
  const [asks, setAsks] = useState<OrderBookQuote[]>([]);

  // Internal state for diffing
  const prevBidsRef = useRef<Map<string, OrderBookQuote>>(new Map());
  const prevAsksRef = useRef<Map<string, OrderBookQuote>>(new Map());

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
      const message: WebSocketMessage = JSON.parse(event.data);
      const { data } = message;
      if (!data) return;

      const { type, bids: newBidsRaw = [], asks: newAsksRaw = [] } = data;

      // Snapshot = replace, Delta = update
      if (type === "snapshot") {
        const bidsMap = new Map();
        const asksMap = new Map();

        newBidsRaw.forEach(([price, size]) => {
          bidsMap.set(price, { price, size, highlightType: "new" });
        });

        newAsksRaw.forEach(([price, size]) => {
          asksMap.set(price, { price, size, highlightType: "new" });
        });

        prevBidsRef.current = new Map(bidsMap);
        prevAsksRef.current = new Map(asksMap);
        setBids(Array.from(bidsMap.values()));
        setAsks(Array.from(asksMap.values()));
      }

      if (type === "delta") {
        const updatedBids = new Map(prevBidsRef.current);
        const updatedAsks = new Map(prevAsksRef.current);

        const processDelta = (
          map: Map<string, OrderBookQuote>,
          updates: [string, string][]
        ) => {
          updates.forEach(([price, size]) => {
            const prev = map.get(price);

            if (size === "0") {
              map.delete(price);
            } else if (!prev) {
              map.set(price, {
                price,
                size,
                highlightType: "new",
              });
            } else {
              const prevSize = prev.size;
              const nextSize = size;
              const diffType = nextSize > prevSize ? "size-up" : "size-down";

              map.set(price, {
                price,
                size,
                highlightType: diffType,
              });
            }
          });
        };

        processDelta(updatedBids, newBidsRaw);
        processDelta(updatedAsks, newAsksRaw);

        prevBidsRef.current = new Map(updatedBids);
        prevAsksRef.current = new Map(updatedAsks);

        setBids(Array.from(updatedBids.values()));
        setAsks(Array.from(updatedAsks.values()));
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

  return { bids, asks };
}
