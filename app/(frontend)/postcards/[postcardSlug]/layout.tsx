import React from "react";
import { Metadata } from "next";
import { getPostcard } from "@/lib/data";
import { notFound } from "next/navigation";
import { Media, Postcard } from "@/lib/types/payload-types";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ postcardSlug: string }>;
}): Promise<Metadata> => {
  const { postcardSlug } = await params;
  const postcard = await getPostcard(postcardSlug);
  if (!postcard) return notFound();

  const postcardTemplate = postcard.template as Postcard;

  const title = postcardTemplate.metadata?.title || "Yours Digitally";
  const description =
    postcardTemplate.metadata?.description ||
    "Personalised postcard. - Yours Digitally";
  const imageUrl = (postcardTemplate.metadata?.image as Media).url || "";

  return {
    title: title,
    description: description,
    metadataBase: new URL(process.env.NEXT_PUBLIC_URL || ""),
    alternates: {
      canonical: `/postcards/${postcard.slug}`,
    },
    openGraph: {
      title: title,
      siteName: title,
      url: `/postcards/${postcard.slug}`,
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
