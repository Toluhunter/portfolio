import type { NextConfig } from "next";
import createMDX from '@next/mdx';
// Use module name strings for plugins so options remain serializable

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  reactStrictMode: true,
  // experimental: {
  //   mdxRs: true,
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.toluhunter.com',
      },
      {
        protocol: 'https',
        hostname: 'toluhunter.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [["remark-gfm", { strict: true, throwOnError: true }]],
    rehypePlugins: [
      'rehype-slug',
      [
        'rehype-autolink-headings',
        {
          behavior: 'append'
        }
      ],
      '@stefanprobst/rehype-extract-toc',
      '@stefanprobst/rehype-extract-toc/mdx',
    ],
  },
});

export default withMDX(nextConfig);
