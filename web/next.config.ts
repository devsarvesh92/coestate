import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this folder so Turbopack doesn't mis-infer it
  // from ambiguous lockfiles further up the tree.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
