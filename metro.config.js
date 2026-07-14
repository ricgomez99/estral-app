const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.server = {
  ...config.server,
  enhanceMiddleware: (middleware) => {
    return (req, res, next) => {
      const origin = req.headers.origin;
      const allowedOrigins = ["null", "localhost", "127.0.0.1"];
      const isLocalNetwork = origin && origin.includes("192.168.");

      if (origin) {
        if (
          allowedOrigins.some((allowed) => origin.includes(allowed)) ||
          isLocalNetwork
        ) {
          res.setHeader("Access-Control-Allow-Origin", origin);
        }
      } else {
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:8081");
      }

      return middleware(req, res, next);
    };
  },
};

module.exports = config;
