"use client";

import { useMDXComponents } from "../../../../mdx-components";
import Content from "./content.mdx";
import YouTube from '@/components/utilities/markdown/Youtube';
import { NavBar } from "@/components/utilities/shared/navbar";
import { Footer } from "@/components/pages/landing/footer";
import { BuyMeACoffee } from "@/components/utilities/shared/buymecoffee";

export default function MDXPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const components = {
    YouTube,
    NavBar,
    Footer,
    BuyMeACoffee,
  };

  return <Content components={useMDXComponents(components)} />;
}
