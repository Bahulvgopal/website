import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "http://localhost:3000",
      lastModified: new Date(),
    },
    {
      url: "http://localhost:3000/events/upcoming",
      lastModified: new Date(),
    },
    {
      url: "http://localhost:3000/events/previous",
      lastModified: new Date(),
    },
    {
      url: "http://localhost:3000/team",
      lastModified: new Date(),
    },
    {
      url: "http://localhost:3000/about",
      lastModified: new Date(),
    },
  ];
}
