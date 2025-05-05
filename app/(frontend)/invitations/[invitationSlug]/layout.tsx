import React from "react";
import { Metadata } from "next";
import { getCachedInvitation } from "@/lib/data";
import { notFound } from "next/navigation";
import { Media } from "@/lib/types/payload-types";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ invitationSlug: string }>;
}): Promise<Metadata> => {
  const { invitationSlug } = await params;
  const invitation = await getCachedInvitation(invitationSlug);
  if (!invitation) return notFound();

  const title = invitation.metadata?.title || "Pozivnica";
  const description = invitation.metadata?.description || "Pozivnica Opis";
  const imageUrl = (invitation.metadata?.image as Media).url || "";

  return {
    title: title,
    description: description,
    metadataBase: new URL(process.env.NEXT_PUBLIC_URL || ""),
    alternates: {
      canonical: new URL(process.env.NEXT_PUBLIC_URL || ""),
    },
    openGraph: {
      title: title,
      siteName: title,
      url: new URL(process.env.NEXT_PUBLIC_URL || ""),
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
