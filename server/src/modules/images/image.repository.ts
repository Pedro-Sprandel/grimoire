import redisClient from "../../redisClient.ts";

export const getCachedImage = async (url: string) => {
  const cachedImage = await redisClient.get(url);

  if (cachedImage) {
    const { buffer, contentType } = JSON.parse(cachedImage);
    return { buffer: Buffer.from(buffer, "base64"), contentType };
  }

  return null;
};

export const setCachedImage = async (
  url: string,
  buffer: Buffer,
  contentType: string
) => {
  await redisClient.set(
    url,
    JSON.stringify({
      buffer: buffer.toString("base64"),
      contentType
    }),
    { EX: 3600 }
  );
};
