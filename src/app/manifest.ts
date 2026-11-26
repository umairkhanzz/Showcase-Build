import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { pageSeo } from "@/content/seo";

/** Web app manifest: name, colours and icons for "Add to home screen". */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} | ${site.role}`,
    short_name: site.shortName,
    description: pageSeo.home.description,
    start_url: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#09090b",
    icons: [
      { src: "/icon", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
