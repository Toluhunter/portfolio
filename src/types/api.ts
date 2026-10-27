// Response shapes of the backend API (NEXT_PUBLIC_API_BASE_URL), typed from the live payloads and the
// backend's Go models. Field names are the wire names; components map them to their own props.
// Optional fields are the ones the backend omits when empty (omitempty).

export interface ApiStat {
    value: string;
    label: string;
}

export interface ApiCaseStudy {
    hook?: string;
    problem: string;
    built: string;
    result: string;
    stats?: ApiStat[];
}

// GET /articles
export interface ApiArticle {
    id: string;
    title: string;
    link: string;
    cover_image: string;
    description: string;
}

export interface ArticlesResponse {
    articles?: ApiArticle[];
}

// GET /articles/{id}/comments lists comments without id or user_id.
export interface ApiCommentListItem {
    article_id: string;
    user_name: string;
    user_profile_picture: string;
    content: string;
    created_at: string;
}

export interface CommentsResponse {
    comments?: ApiCommentListItem[];
}

// POST /articles/{id}/comments returns the full stored comment.
export interface ApiComment {
    id: string;
    article_id: string;
    user_id: string;
    user_name: string;
    user_profile_picture?: string;
    content: string;
    created_at: string;
}

// GET /services
export interface ApiService {
    id: string;
    sort_order: number;
    name: string;
    icon: string;
    hook: string;
    includes: string[];
    case_study_link?: string;
}

export interface ServicesResponse {
    services?: ApiService[];
}

// GET /pricing
export interface ApiPricingTier {
    name: string;
    description: string;
    comparison: string;
    included: string[];
    add_ons: string[];
    audit: string;
    project: string;
    retainer: string;
}

export interface PricingResponse {
    intro: string;
    tiers?: ApiPricingTier[];
}

// GET /products
export interface ApiProduct {
    id: string;
    sort_order: number;
    name: string;
    subtitle: string;
    description: string[];
    status: string;
    images: string[];
    image_aspect_ratios: number[];
    website_link?: string;
    technologies: string[];
    roles: string[];
    case_study: ApiCaseStudy;
}

export interface ProductsResponse {
    products?: ApiProduct[];
}

// GET /engagements
export interface ApiEngagement {
    id: string;
    sort_order: number;
    title: string;
    subtitle: string;
    icon: string;
    case_study: ApiCaseStudy;
}

export interface EngagementsResponse {
    engagements?: ApiEngagement[];
}

// GET /certifications
export interface ApiCertification {
    id: string;
    sort_order: number;
    picture: string;
    title: string;
    date: string;
    expiring: string;
    institution: string;
    verify_link: string;
}

export interface CertificationsResponse {
    certifications?: ApiCertification[];
}
