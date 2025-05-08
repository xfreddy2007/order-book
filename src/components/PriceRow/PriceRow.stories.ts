import type { Meta, StoryObj } from "@storybook/react";
import PriceRow from ".";

const meta = {
  title: "Component/PriceRow",
  component: PriceRow,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof PriceRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Buy: Story = {
  args: {
    type: "buy",
    price: 100,
    size: 1000,
    total: 100000,
    maxTotal: 100000,
    isNewPrice: false,
  },
};

export const Sell: Story = {
  args: {
    type: "sell",
    price: 10000,
    size: 100,
    total: 1170,
    maxTotal: 285987,
    isNewPrice: false,
  },
};
