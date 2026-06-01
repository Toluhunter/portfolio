'use client'

import type { MDXComponents } from 'mdx/types'
import { getArticleComponents } from '@/utils/mdx-components'

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return getArticleComponents(components)
}
