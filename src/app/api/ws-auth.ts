// pages/api/ws-auth.js
import crypto from "crypto";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const API_KEY = process.env.API_KEY || "";
  const API_SECRET = process.env.API_SECRET || "";

  const timestamp = Date.now().toString();
  const payload = `GET/realtime${timestamp}`;
  const signature = crypto
    .createHmac("sha256", API_SECRET)
    .update(payload)
    .digest("hex");

  res.status(200).json({
    apiKey: API_KEY,
    timestamp,
    signature,
    endpoint: "wss://ws.btse.com/ws/oss/futures",
  });
}
