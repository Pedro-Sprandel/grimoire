import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { getImageByUrl } from "./image.service.ts";

export const getImageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { url } = req.params;

  if (!url || typeof url !== "string") {
    return next(
      createHttpError(400, "Invalid or missing 'url' query parameter")
    );
  }

  try {
    const response = await getImageByUrl(url);

    res.setHeader("Content-Type", response.contentType);
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.send(response.buffer);
  } catch (error) {
    if (error instanceof TypeError) {
      return next(createHttpError(400, "Invalid URL format"));
    }
    next(error);
  }
};
