import { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";

export const useImageLoader = (src: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const response = await axiosInstance.get(`http://localhost:3000/api/image?url=${encodeURIComponent(src)}`, {
          responseType: "blob"
        });

        const imageUrl = URL.createObjectURL(response.data);
        setImageSrc(imageUrl);
      } catch (_) {
        setImageSrc(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadImage();
  }, [src]);

  return { isLoading, imageSrc };
};