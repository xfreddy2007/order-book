# Order book

## Screenshot:

![Screenshot](https://private-user-images.githubusercontent.com/54787518/441746347-071b5870-bdf8-47b9-a145-65681de36d33.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDY3MTQzNDEsIm5iZiI6MTc0NjcxNDA0MSwicGF0aCI6Ii81NDc4NzUxOC80NDE3NDYzNDctMDcxYjU4NzAtYmRmOC00N2I5LWExNDUtNjU2ODFkZTM2ZDMzLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA1MDglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNTA4VDE0MjA0MVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTJjNzM3MzE2MzEwOGFlZWMxZGEwY2ExNTViOGI1NDUyYmQ4ZTdhYjg4NTdlZWVjNGY5NTc2MGQ3ZGM5YzFhMjMmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.iY0GPDsCjyYs_jQfe06IUS7uosANN-_VvL0UWQoczc8)

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
