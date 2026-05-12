import { MetadataRoute } from 'next';
import articles from '@/data/articles.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const articleRoutes = articles.map(article => ({
    url: `https://toluhunter.com${article.link}`,
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
      url: 'https://www.toluhunter.com/articles',
      lastModified,
    },
    {
      url: 'https://www.toluhunter.com/cv',
      lastModified,
    },
    {
      url: 'https://www.toluhunter.com/experience',
      lastModified,
    },
    {
      url: 'https://www.toluhunter.com/products',
      lastModified,
    },
    {
      url: 'https://www.toluhunter.com/services',
      lastModified,
    },
    ...articleRoutes,
  ]
}
