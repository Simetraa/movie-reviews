import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://media.themoviedb.org/**"),
      new URL("https://image.tmdb.org/**")
    ]
  }
  /* config options here */
};

export default nextConfig;
