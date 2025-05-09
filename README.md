# Order book

## Screenshot:

![截圖 2025-05-08 晚上10 16 30](https://github.com/user-attachments/assets/c6161cc9-e669-49b8-9e36-28172269daeb)

## Summary

This feature implements a real-time order book component for BTSE's futures market using Next.js, WebSocket, and Tailwind CSS. It displays live bid and ask data with key enhancements:

✅ Features:
Real-time WebSocket updates from BTSE

Displays:

Price (USD)

Size (contract quantity)

Cumulative Total (for volume depth)

Mid-price separator with current price and directional arrow

Visual volume bars for each row proportional to cumulative size

✨ Quote Highlighting Logic:
New Quote (price not previously shown): highlights the full row

🔴 Red for new asks

🟢 Green for new bids

Size Change:

🟢 Green cell highlight for increased size

🔴 Red cell highlight for decreased size

🛠️ Tech Stack:

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- WebSocket for live data stream
