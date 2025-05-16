import { RefreshRouteOnSave } from "@/components/RefrechRouteOnSave";
import { notFound } from "next/navigation";
import CardComponent from "@/components/card/Card";
import { getCachedPostcardTemplate, getPostcardTemplates } from "@/lib/data";
import Image from "next/image";
import { Media } from "@/lib/types/payload-types";
import OrientationWarning from "@/components/OrientationWarning";
import CreatePostcardForm from "@/components/CreatePostcardForm";
import { CardContentProvider } from "@/components/providers/CardContentProvider";
import { FlipCardProvider } from "@/components/providers/FlipCardProvider";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const generateStaticParams = async () => {
  const postcardTemplates = await getPostcardTemplates();

  return postcardTemplates.map((postcardTemplate) => ({
    postcardTemplateSlug: postcardTemplate.slug,
  }));
};

const Page = async ({
  params,
}: {
  params: Promise<{ postcardTemplateSlug: string }>;
}) => {
  const { postcardTemplateSlug } = await params;

  const postcard = await getCachedPostcardTemplate(postcardTemplateSlug);
  if (!postcard) return notFound();

  return (
    <>
      <RefreshRouteOnSave />
      <OrientationWarning />
      <div
        className={
          "flex min-h-screen w-full flex-col items-center justify-center bg-gray-200 pt-8 lg:pt-16"
        }
      >
        {postcard.pageContent.backgroundImage && (
          <div className={"fixed top-0 left-0 z-0 h-screen w-full"}>
            <Image
              src={(postcard.pageContent.backgroundImage as Media).url || ""}
              alt={(postcard.pageContent.backgroundImage as Media).alt || ""}
              className={"object-cover"}
              fill
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        )}
        <div
          className={"relative z-10 flex w-full justify-start px-6 md:px-16"}
        >
          <Link href={"/"} className={"flex gap-1"}>
            <ArrowLeft color={"white"} />
            <span className={"text-xl font-normal text-white"}>Back</span>
          </Link>
        </div>
        <div
          className={
            "relative z-10 grid w-full grid-cols-12 gap-y-2 p-6 md:px-16 lg:gap-y-4 lg:p-16"
          }
        >
          <div
            className={
              "col-span-12 col-start-1 row-span-1 row-start-1 md:col-span-8 lg:col-span-6"
            }
          >
            <h3
              className={
                "text-xl font-normal text-white lg:text-2xl xl:text-3xl"
              }
            >
              {postcard.pageContent.subtitle}
            </h3>
          </div>
          <div className={"col-span-12 col-start-1 row-span-1 row-start-2"}>
            <h1
              className={
                "text-3xl font-bold text-white lg:text-4xl xl:text-6xl"
              }
            >
              {postcard.pageContent.title}
            </h1>
          </div>
        </div>
        <div
          className={
            "relative z-10 mb-16 flex w-full flex-col items-center justify-center gap-2 px-6 md:gap-12 md:px-16 xl:mb-0 xl:flex-row xl:items-start xl:gap-0"
          }
        >
          <CardContentProvider>
            <FlipCardProvider>
              <div
                className={
                  "mb-8 flex w-full flex-col items-center md:mb-16 lg:max-w-[1020px] xl:flex-1/3"
                }
              >
                <CardComponent
                  type={"postcard-template"}
                  lang={"english"}
                  card={postcard}
                  withFlipProvider={false}
                  withContentProvider={false}
                />
              </div>
              <div className={"w-full flex-1 md:mb-16 md:hidden xl:block"}>
                <CreatePostcardForm postcardTemplateId={postcard.id} />
              </div>
            </FlipCardProvider>
          </CardContentProvider>
        </div>
      </div>
    </>
  );
};

export default Page;
