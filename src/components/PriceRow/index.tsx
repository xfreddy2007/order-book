import React from "react";
import classNames from "classnames";
import { formatNumber } from "@/lib/helpers/orderFormat";
import "./PriceRow.css";

type PriceRowProps = {
  type: "buy" | "sell";
  price: number;
  size: number;
  total: number;
  maxTotal: number;
  isNewPrice: boolean;
};

const PriceRow: React.FC<PriceRowProps> = ({
  type,
  price,
  size,
  total,
  maxTotal,
  isNewPrice,
}) => {
  return (
    <div
      className={classNames(
        "relative flex justify-between px-1 font-bold transition-all hover:bg-[#1E3059]",
        type === "buy" && isNewPrice && "buy-animation",
        type === "sell" && isNewPrice && "sell-animation"
      )}
    >
      <div
        className={classNames(
          "absolute right-0 top-0 bottom-0 opacity-30",
          type === "buy" ? "bg-[#10ba681f]" : "bg-[#ff5a5a1f]"
        )}
        style={{ width: `${(total / maxTotal) * 100}%` }}
      />
      <div
        className={classNames(
          "w-[30%]",
          type === "sell" ? "text-[#FF5B5A]" : "text-[#00b15d]"
        )}
      >
        {formatNumber(price)}
      </div>
      <div className="w-[30%] text-right">{formatNumber(size)}</div>
      <div className="w-[40%] text-right">{formatNumber(total)}</div>
    </div>
  );
};

export default PriceRow;
