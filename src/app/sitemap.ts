import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
<<<<<<< ours
  const baseUrl = "https://flutterly.co.uk";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
=======
  const baseUrl = "https://flutterly.uk";

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
>>>>>>> theirs
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
