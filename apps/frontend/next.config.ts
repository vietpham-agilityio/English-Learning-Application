import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname, "../.."),
  outputFileTracingExcludes: {
    "*": [
      "node_modules/.pnpm/client-only@0.0.1/**",
      "**/node_modules/client-only/**",
    ],
  },
  turbopack: {
    root: path.join(__dirname, "../.."),
  },
  serverExternalPackages: ["client-only"],
};

export default nextConfig;
