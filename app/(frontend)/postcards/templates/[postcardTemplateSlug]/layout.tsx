import React from "react";
import { Metadata } from "next";
import { getPostcardTemplate, getPostcardTemplates } from "@/lib/data";
import { notFound } from "next/navigation";
import { Media } from "@/lib/types/payload-types";

export const generateStaticParams = async () => {
  const postcardTemplates = await getPostcardTemplates();

  return postcardTemplates.map((postcardTemplate) => ({
    postcardTemplateSlug: postcardTemplate.slug,
  }));
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ postcardTemplateSlug: string }>;
}): Promise<Metadata> => {
  const { postcardTemplateSlug } = await params;
  const postcard = await getPostcardTemplate(postcardTemplateSlug);
  if (!postcard) return notFound();

  const title = postcard.metadata?.title || "Yours Digitally";
  const description =
    postcard.metadata?.description ||
    "Receive a digital postcard from Croatia - Yours digitally, Central Dalmatia";
  const imageUrl = (postcard.metadata?.image as Media).url || "";

  return {
    title: title,
    description: description,
    metadataBase: new URL(process.env.NEXT_PUBLIC_URL || ""),
    alternates: {
      canonical: `/postcards/templates/${postcard.slug}`,
    },
    openGraph: {
      title: title,
      siteName: title,
      url: `/postcards/templates/${postcard.slug}`,
      images: new URL(imageUrl),
      type: "website",
      locale: "hr",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: new URL(imageUrl),
    },
  };
};

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <>{children}</>;
};

export default Layout;
