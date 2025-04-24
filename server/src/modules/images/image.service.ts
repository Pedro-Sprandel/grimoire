import createHttpError from "http-errors";
import { getCachedImage, setCachedImage } from "./image.repository.ts";

export const getImageByUrl = async (url: string) => {
  const cachedImage = await getCachedImage(url);
  if (cachedImage) {
    return cachedImage;
  }

  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      throw createHttpError(404, "Image not found");
    } else {
      throw createHttpError(502, "Failed to fetch image");
    }
  }

  const imageBuffer = Buffer.from(await response.arrayBuffer());
  const contentType = response.headers.get("content-type") || "image/jpeg";

  await setCachedImage(url, imageBuffer, contentType);

  return { buffer: imageBuffer, contentType };
};
