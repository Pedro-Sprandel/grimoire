import type { Request, Response } from "express";
import redisClient from "../../redisClient.ts";
import logger from "../../utils/logger.ts";

export const getImageController = async (req: Request, res: Response) => {
  const { url } = req.query;

  if (!url || typeof url !== "string") {
    res.status(400).json({ error: "Invalid or missing 'url' query parameter" });
    return;
  }

  try {
    const cachedImage = await redisClient.get(url);

    if (cachedImage) {
      logger.info(`Cache hit for image: ${url}`);
      res.setHeader("Content-Type", "image/jpeg");
      res.setHeader("Cache-Control", "public, max-age=3600");
      res.send(Buffer.from(cachedImage, "base64"));
      return;
    }

    logger.info(`Cache miss for image: ${url}`);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    const imageBuffer = Buffer.from(await response.arrayBuffer());

    await redisClient.set(url, imageBuffer.toString("base64"), { EX: 3600 }); // Expira em 1 hora

    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.send(imageBuffer);
  } catch (error) {
    logger.error(`Error fetching image: ${url}`, error);
    res.status(500).json({ error: "Failed to fetch image" });
  }
};