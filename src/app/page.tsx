"use client";

import OrderBook from "@/components/OrderBook";

const Home: React.FC = () => {
  return (
    <main>
      <h1>WebSocket Feed</h1>
      <OrderBook symbol="BTCPFC" />
    </main>
  );
};

export default Home;
