import { experience, certifications } from '@/data/content.json';
import projects from '@/data/projects.json';

const BASE_URL = 'https://toluhunter.com';
const API_URL = 'https://api.toluhunter.com';

interface Article {
    title: string;
    link: string;
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

            const data = await res.json();
            collected.push(...data.articles);
            lastEvaluatedKey = data.last_evaluated_key;
        } while (lastEvaluatedKey);
    } catch {
        // API unreachable - articles section omitted
    }

    return collected;
}

export async function GET() {
    const articles = await fetchAllArticles();

    const experienceSection = experience
        .map((e) => `- **${e.role}** at ${e.company} (${e.duration})`)
        .join('\n');

    const certificationsSection = certifications
        .map((c) => `- ${c.title} - ${c.institution} (${c.date})`)
        .join('\n');

    const productsSection = projects
        .map((p) => `- **${p.name}**: ${p.subtitle}. ${p.description[0]} ${p.websiteLink ? `Website: ${p.websiteLink}` : ''}`)
        .join('\n');

    const articlesSection = articles.length > 0
        ? articles.map((a) => `- [${a.title}](${BASE_URL}${a.link})`).join('\n')
        : '- See full list at https://toluhunter.com/articles';

    const content = `# Tolulope Fakoya

> Cloud and AI Engineer specializing in AWS architecture, MLOps, and security-first infrastructure.

A product does not truly exist until it is in the hands of its users - and architecture is what designs that journey. It can be smooth or jagged, fast or fragile. That is the beauty of it.

## Pages

- [Home](${BASE_URL}): Landing page with introduction and overview of services
- [About](${BASE_URL}/about): Background, philosophy, and approach to cloud and AI engineering
- [Services](${BASE_URL}/services): Cloud consultation, solution architecture, AI/ML pipelines, cost optimization, security audits
- [Experience](${BASE_URL}/experience): Full work history across cloud architecture, DevOps, and system administration
- [Articles](${BASE_URL}/articles): Technical writing on cloud architecture, engineering, and systems
- [Products](${BASE_URL}/products): Products and tools built by Tolulope Fakoya
- [CV](${BASE_URL}/cv): Full curriculum vitae
- [Book a Call](${BASE_URL}/book): Free consultation booking

## Skills

AWS Architecture, MLOps, Cloud Security, Infrastructure as Code, Terraform, Solution Architecture, AI/ML Systems, DevOps, AWS Bedrock, AWS SageMaker, Google Vertex AI, CI/CD, Serverless Architecture, DynamoDB, Lambda, API Gateway

## Certifications

${certificationsSection}

## Experience

${experienceSection}

## Products

${productsSection}

## Articles

${articlesSection}
`;

    return new Response(content, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=86400',
        },
    });
}