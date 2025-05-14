import { RefreshRouteOnSave } from "@/components/RefrechRouteOnSave";
import { notFound } from "next/navigation";
import CardComponent from "@/components/card/Card";
import { getCachedPostcardTemplate, getPostcardTemplates } from "@/lib/data";
import ShareCard from "@/components/ShareCard";
import IncrementViewAnalytic from "@/components/IncrementViewAnalytic";
import Image from "next/image";
import { Media } from "@/lib/types/payload-types";
import OrientationWarning from "@/components/OrientationWarning";

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
      {postcard && <IncrementViewAnalytic postcardId={postcard.id} />}
      <div
        className={
          "flex min-h-screen w-full flex-col items-center justify-center bg-gray-200 pt-16"
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
          className={
            "relative z-10 grid w-full grid-cols-12 gap-y-2 p-6 sm:p-16 md:gap-y-4"
          }
        >
          <div
            className={
              "col-span-12 col-start-1 row-span-1 row-start-1 md:col-span-8 lg:col-span-6"
            }
          >
            <h3 className={"text-xl font-normal text-white md:text-3xl"}>
              {postcard.pageContent.subtitle}
            </h3>
          </div>
          <div
            className={
              "col-span-12 col-start-1 row-span-1 row-start-2 md:col-span-8 lg:col-span-6"
            }
          >
            <h1 className={"text-5xl font-bold text-white md:text-6xl"}>
              {postcard.pageContent.title}
            </h1>
          </div>
          <div
            className={
              "col-span-12 grid sm:col-span-3 sm:col-start-10 sm:row-start-1 md:row-span-2"
            }
          >
            <ShareCard postcardId={postcard.id} />
          </div>
        </div>
        <div
          className={
            "relative z-10 mb-16 flex w-full items-center justify-center px-6 sm:px-16"
          }
        >
          <div className="w-full lg:max-w-[1020px]">
            <CardComponent type={"postcard-template"} card={postcard} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
