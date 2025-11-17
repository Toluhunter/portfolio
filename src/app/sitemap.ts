import { MetadataRoute } from 'next';
import blogs from '@/data/blogs.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const blogRoutes = blogs.map(blog => ({
    url: `https://toluhunter.com${blog.link}`,
    lastModified,
  }));

  return [
    {
      url: 'https://www.toluhunter.com',
      lastModified,
    },
    {
      url: 'https://www.toluhunter.com/about',
      lastModified,
    },
    {
      url: 'https://www.toluhunter.com/blogs',
      lastModified,
    },
    {
      url: 'https://www.toluhunter.com/cv',
      lastModified,
    },
    {
      url: 'https://www.toluhunter.com/labs',
      lastModified,
    },
    {
      url: 'https://www.toluhunter.com/projects',
      lastModified,
    },
    {
      url: 'https://www.toluhunter.com/services',
      lastModified,
    },
    ...blogRoutes,
  ]
}
