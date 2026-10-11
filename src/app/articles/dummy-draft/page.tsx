import fs from 'fs'
import path from 'path'
import { NavBar } from '@/components/utilities/shared/navbar'
import { Footer } from '@/components/pages/landing/footer'
import { TOC } from '@/components/utilities/shared/toc'
import { extractToc } from '@/utils/extract-toc'
import DraftContent from './draft-content'

export default function DraftPage() {
    const raw = fs.readFileSync(
        path.join(process.cwd(), 'src/app/articles/dummy-draft/content.mdx'),
        'utf-8'
    )
    const toc = extractToc(raw)

    return (
        <>
            <NavBar />
            <div className="max-w-screen-xl mx-auto px-6 pt-20 pb-28">
                <div className="flex gap-12">
                    <main className="flex-1 min-w-0 max-w-[36rem] mx-auto py-8 px-6 md:px-10 bg-panel border border-foreground/10 rounded-2xl">
                        <DraftContent />
                    </main>
                    <aside className="hidden xl:block w-56 shrink-0">
                        <TOC toc={toc} />
                    </aside>
                </div>
            </div>
            <Footer />
        </>
    )
}
