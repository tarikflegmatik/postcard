import React from "react";
import { Metadata } from "next";
import { getCachedLandmark, getLandmarks } from "@/lib/data";
import { notFound } from "next/navigation";
import { Media } from "@/lib/types/payload-types";

export const generateStaticParams = async () => {
  const landmarks = await getLandmarks();

  return landmarks.map((landmark) => ({
    landmarkSlug: landmark.slug,
  }));
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ landmarkSlug: string }>;
}): Promise<Metadata> => {
  const { landmarkSlug } = await params;
  const landmark = await getCachedLandmark(landmarkSlug);
  if (!landmark) return notFound();

  const title = landmark.metadata?.title || "Landmark";
  const description = landmark.metadata?.description || "Landmark Description";
  const imageUrl = (landmark.metadata?.image as Media).url || "";

  return {
    title: title,
    description: description,
    metadataBase: new URL(process.env.NEXT_PUBLIC_URL || ""),
    alternates: {
      canonical: `/landmarks/${landmark.slug}`,
    },
    openGraph: {
      title: title,
      siteName: title,
      url: `/invitations/${landmark.slug}`,
      images: new URL(imageUrl),
      type: "website",
      locale: "en",
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
