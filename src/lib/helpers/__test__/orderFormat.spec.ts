import { describe, it, expect } from "vitest";
import {
  ordersNumberParser,
  orderWithTotalFormatter,
  formatNumber,
} from "../orderFormat";

describe("ordersNumberParser", () => {
  it("should format orders correctly", () => {
    const orders = [
      { price: "100.5", size: "2.5" },
      { price: "200.75", size: "3.25" },
    ];

    const parsedOrders = orders.map(ordersNumberParser);

    expect(parsedOrders).toEqual([
      { price: 100.5, size: 2.5 },
      { price: 200.75, size: 3.25 },
    ]);
  });
});

describe("orderWithTotalFormatter", () => {
  it("should format orders with total correctly", () => {
    const orders = [
      { price: 100.5, size: 2.5 },
      { price: 200.75, size: 3.25 },
    ];

    const formattedOrders = orderWithTotalFormatter(orders);

    expect(formattedOrders).toEqual([
      { price: 100.5, size: 2.5, total: 2.5 },
      { price: 200.75, size: 3.25, total: 5.75 },
    ]);
  });
});

describe("formatNumber", () => {
  it("should format numbers correctly", () => {
    const number = 1234567.89;
    const formattedNumber = formatNumber(number);
    expect(formattedNumber).toBe("1,234,567.89");
  });

  it("should handle zero correctly", () => {
    const number = 0;
    const formattedNumber = formatNumber(number);
    expect(formattedNumber).toBe("0");
  });

  it("should handle negative numbers correctly", () => {
    const number = -1234567.89;
    const formattedNumber = formatNumber(number);
    expect(formattedNumber).toBe("-1,234,567.89");
  });
});
