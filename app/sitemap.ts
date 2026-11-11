import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://alexisbuelvas.dev", lastModified: new Date() },
    { url: "https://alexisbuelvas.dev/blog", lastModified: new Date() },
  ];
}
