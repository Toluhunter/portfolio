declare module '*.mdx' {
    import * as React from 'react'
    export const tableOfContents: Array<{
        value: string
        depth: number
        id?: string
        children?: any[]
    }>
    const MDXComponent: (props: any) => React.JSX.Element
    export default MDXComponent
}
