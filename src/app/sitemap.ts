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
      url: 'https://toluhunter.com',
      lastModified,
    },
    {
      url: 'https://toluhunter.com/about',
      lastModified,
    },
    {
      url: 'https://toluhunter.com/blogs',
      lastModified,
    },
    {
        url: 'https://toluhunter.com/cv',
        lastModified,
    },
    {
        url: 'https://toluhunter.com/labs',
        lastModified,
    },
    {
        url: 'https://toluhunter.com/projects',
        lastModified,
    },
    {
        url: 'https://toluhunter.com/services',
        lastModified,
    },
    ...blogRoutes,
  ]
}
