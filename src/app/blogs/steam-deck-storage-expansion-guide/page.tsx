"use client";

import { useMDXComponents } from "../../../../mdx-components";
import Content, { tableOfContents } from "./content.mdx";
import YouTube from '@/components/utilities/markdown/Youtube';
import { NavBar } from "@/components/utilities/shared/navbar";
import { Footer } from "@/components/pages/landing/footer";
import { BuyMeACoffee } from "@/components/utilities/shared/buymecoffee";
import { TOC } from "@/components/utilities/shared/toc";
import OriginalCommentSection from "@/components/utilities/shared/CommentSection";
import { usePathname } from "next/navigation";

export default function MDXPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const pathParts = pathname.split('/');
  const articleId = pathParts[pathParts.length - 1] || pathParts[pathParts.length - 2];

  const CommentSection = (props: any) => <OriginalCommentSection {...props} articleId={articleId} />;

  const components = {
    YouTube,
    NavBar,
    CommentSection,
    Footer,
    BuyMeACoffee
  };

  return <div className="mdx-page grid md:grid-cols-4 gap-8">
    <aside className="hidden md:block md:col-span-1">
      <TOC toc={tableOfContents} />
    </aside>
    <main className="prose md:col-span-3">
      <Content components={useMDXComponents(components)} />
    </main>
  </div>
}
