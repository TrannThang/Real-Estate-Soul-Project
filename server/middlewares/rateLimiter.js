const redis = require("../config/redis.config");
const { generateKeyRedis } = require("../utils/fn");

const rateLimiter = async (req, res, next) => {
  // const clientId = req.headers?.client_id;
  const clientId = generateKeyRedis("");
  const currentTime = Date.now();
  const client = await redis.hGetAll(`rateLimit-${clientId}`);
  if (Object.keys(client).length === 0) {
    await redis.hSet(`rateLimit-${clientId}`, "createdAt", currentTime);
    await redis.hSet(`rateLimit-${clientId}`, "count", 1);
    redis.expireAt(`rateLimit-${clientId}`, parseInt(+new Date() / 1000) + 600); //20s

    return next();
  }
  let difference = (currentTime - client.createdAt) / 1000;

  if (difference > process.env.RATE_LIMIT_RESET) {
    await redis.hSet(`rateLimit-${clientId}`, "createdAt", currentTime);
    await redis.hSet(`rateLimit-${clientId}`, "count", 1);
    redis.expireAt(`rateLimit-${clientId}`, parseInt(+new Date() / 1000) + 600);

    return next();
  }
  if (client.count > process.env.RATE_LIMIT_COUNT) {
    return res.status(429).json({
      success: false,
      mes: "Do not spam!!!",
    });
  } else {
    await redis.hSet(`rateLimit-${clientId}`, "count", +client.count + 1);
    redis.expireAt(`rateLimit-${clientId}`, parseInt(+new Date() / 1000) + 600);

    return next();
  }
};

module.exports = rateLimiter;
