import { MetadataRoute } from 'next';

const BASE_URL = 'https://toluhunter.com';
const API_URL = 'https://api.toluhunter.com';

interface Article {
    link: string;
}

interface ArticlesResponse {
    articles: Article[];
    last_evaluated_key?: Record<string, unknown>;
}

async function fetchAllArticles(): Promise<Article[]> {
    const collected: Article[] = [];
    let lastEvaluatedKey: Record<string, unknown> | undefined;

    try {
        do {
            const url = new URL(`${API_URL}/articles`);
            url.searchParams.set('limit', '100');
            if (lastEvaluatedKey) {
                url.searchParams.set('last_evaluated_key', JSON.stringify(lastEvaluatedKey));
            }

            const res = await fetch(url.toString(), { next: { revalidate: 86400 } });
            if (!res.ok) break;

            const data: ArticlesResponse = await res.json();
            collected.push(...data.articles);
            lastEvaluatedKey = data.last_evaluated_key;
        } while (lastEvaluatedKey);
    } catch {
        // API unreachable at build time - individual articles omitted from sitemap
    }

    return collected;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const articles = await fetchAllArticles();

    const staticRoutes: MetadataRoute.Sitemap = [
        { url: BASE_URL,                        priority: 1.0, changeFrequency: 'monthly' },
        { url: `${BASE_URL}/about`,             priority: 0.9, changeFrequency: 'monthly' },
        { url: `${BASE_URL}/services`,          priority: 0.9, changeFrequency: 'monthly' },
        { url: `${BASE_URL}/book`,              priority: 0.8, changeFrequency: 'monthly' },
        { url: `${BASE_URL}/experience`,        priority: 0.7, changeFrequency: 'monthly' },
        { url: `${BASE_URL}/articles`,          priority: 0.6, changeFrequency: 'weekly'  },
        { url: `${BASE_URL}/cv`,                priority: 0.5, changeFrequency: 'monthly' },
        { url: `${BASE_URL}/products`,          priority: 0.4, changeFrequency: 'monthly' },
    ];

    const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
        url: `${BASE_URL}${article.link}`,
        priority: 0.7,
        changeFrequency: 'monthly',
    }));

    return [...staticRoutes, ...articleRoutes];
}
