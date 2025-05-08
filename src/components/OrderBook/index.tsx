import React from "react";
import { ArrowUp } from "lucide-react";
import classNames from "classnames";
import { OrderWithTotal } from "@/lib/helpers/orderFormat";
import PriceRow from "../PriceRow";

type OrderBookProps = {
  sellOrdersWithTotal: OrderWithTotal[];
  buyOrdersWithTotal: OrderWithTotal[];
  midPrice: string;
  maxTotal: number;
  isPriceGoingUp: boolean;
};

const OrderBook: React.FC<OrderBookProps> = ({
  buyOrdersWithTotal,
  sellOrdersWithTotal,
  midPrice,
  maxTotal,
  isPriceGoingUp,
}) => {
  if (
    !buyOrdersWithTotal ||
    !sellOrdersWithTotal ||
    buyOrdersWithTotal.length === 0 ||
    sellOrdersWithTotal.length === 0
  ) {
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
        <p className="w-[30%]">Price (USD)</p>
        <p className="w-[30%] text-right">Size</p>
        <p className="w-[40%] text-right">Total</p>
      </div>

      {/* Sells */}
      <div className="space-y-0.5">
        {sellOrdersWithTotal
          .reverse()
          .map(({ price, size, total, highlightType }, i) => (
            <PriceRow
              key={`ask-${i}`}
              type="sell"
              price={price}
              size={size}
              total={total}
              maxTotal={maxTotal}
              isNewPrice={highlightType === "new"}
            />
          ))}
      </div>

      {/* Mid Price */}
      <div
        className={classNames(
          "flex items-center justify-center my-1 font-bold text-lg",
          isPriceGoingUp
            ? "text-[#00b15d] bg-[#10ba681f]"
            : "text-[#FF5B5A] bg-[#ff5a5a1f]"
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
        {buyOrdersWithTotal.map(({ price, size, total, highlightType }, i) => (
          <PriceRow
            key={`bid-${i}`}
            type="buy"
            price={price}
            size={size}
            total={total}
            maxTotal={maxTotal}
            isNewPrice={highlightType === "new"}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderBook;
