const express = require("express");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();

// Configuration
const { PORT, HOST, PROXY_URL } = process.env || {};

// Create Express Server
const app = express();

// Logging
app.use(morgan("dev"));

// Info GET endpoint
app.get("/info", (req, res, next) => {
  res.send("This is a proxy service");
});

app.use("/stack-go", createProxyMiddleware({ target: process.env.PROXY_URL, changeOrigin: true }));

// Start Proxy
app.listen(PORT, HOST, () => {
  console.info(`Starting Proxy at ${HOST}:${PORT}`);
});
