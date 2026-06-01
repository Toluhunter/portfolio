import GithubSlugger from 'github-slugger'

type TocItem = {
    value: string
    depth: number
    id: string
    children: TocItem[]
}

export function extractToc(rawMdx: string): TocItem[] {
    const slugger = new GithubSlugger()

    // Strip fenced code blocks so headings inside them are ignored
    const withoutCodeBlocks = rawMdx.replace(/```[\s\S]*?```/g, '')

    const headingRegex = /^(#{1,6})\s+(.+)$/gm
    const flat: Array<{ value: string; depth: number; id: string }> = []
    let match

    while ((match = headingRegex.exec(withoutCodeBlocks)) !== null) {
        const depth = match[1].length
        const value = match[2]
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
            .replace(/`([^`]+)`/g, '$1')
            .replace(/\*\*([^*]+)\*\*/g, '$1')
            .replace(/\*([^*]+)\*/g, '$1')
            .trim()

        flat.push({ value, depth, id: slugger.slug(value) })
    }

    return buildTree(flat)
}

function buildTree(flat: Array<{ value: string; depth: number; id: string }>): TocItem[] {
    const root: TocItem[] = []
    const stack: TocItem[] = []

    for (const item of flat) {
        const node: TocItem = { ...item, children: [] }

        while (stack.length > 0 && stack[stack.length - 1].depth >= item.depth) {
            stack.pop()
        }

        if (stack.length === 0) {
            root.push(node)
        } else {
            stack[stack.length - 1].children.push(node)
        }

        stack.push(node)
    }

    return root
}
