import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPage, pages } from "@/global/site";
import { PageView } from "../_components/PageView";

type Props = { params: Promise<{ slug: string[] }> };

export const dynamicParams = false;

export const generateStaticParams = () =>
  pages.filter((p) => p.path !== "/").map((p) => ({ slug: p.path.slice(1).split("/") }));

const find = async (params: Props["params"]) => getPage("/" + (await params).slug.join("/"));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await find(params);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: page.path },
    openGraph: { title: page.title, description: page.description, url: page.path, type: page.article ? "article" : "website" },
    twitter: { card: "summary_large_image", title: page.title, description: page.description },
    ...(/^\/(thank-you|404)/.test(page.path) && { robots: { index: false, follow: false } }),
  };
}

export default async function SitePage({ params }: Props) {
  const page = await find(params);
  if (!page) notFound();
  return <PageView page={page} />;
}
