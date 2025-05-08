"use client";

import OrderBook from "@/components/OrderBook";

const Home: React.FC = () => {
  return (
    <main>
      <OrderBook symbol="BTCPFC" />
    </main>
  );
};

export default Home;
