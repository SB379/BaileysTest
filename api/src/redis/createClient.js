import Redis from "ioredis";

export default async () => {
  const client = new Redis(process.env.REDIS_URL);
  await client.connect();
  return client;
};
