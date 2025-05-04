import { RefreshRouteOnSave } from "@/components/RefrechRouteOnSave";
import { notFound } from "next/navigation";
import CardComponent from "@/components/Card";
import { getPostcard } from "@/lib/data";
import ShareCard from "@/components/ShareCard";
import IncrementViewAnalytic from "@/components/IncrementViewAnalytic";

const Page = async ({
  params,
}: {
  params: Promise<{ postcardSlug: string }>;
}) => {
  const { postcardSlug } = await params;

  const postcard = await getPostcard(postcardSlug);
  if (!postcard) return notFound();

  return (
    <>
      <RefreshRouteOnSave />
      {postcard && <IncrementViewAnalytic postcardId={postcard.id} />}
      <div
        className={
          "flex min-h-screen w-full flex-col items-center justify-center bg-gray-200 pt-16"
        }
      >
        <div className={"grid w-full grid-cols-12 p-6 sm:p-16"}>
          <div
            className={
              "col-span-12 col-start-1 row-span-1 row-start-1 sm:col-span-8 lg:col-span-6"
            }
          >
            <h3 className={"text-xl md:text-3xl"}>
              {postcard.pageHeader.subtitle}
            </h3>
          </div>
          <div
            className={
              "col-span-12 col-start-1 row-span-1 row-start-2 sm:col-span-8 lg:col-span-6"
            }
          >
            <h1 className={"text-5xl md:text-6xl"}>
              {postcard.pageHeader.title}
            </h1>
          </div>
          <div
            className={
              "col-span-12 grid sm:col-span-3 sm:col-start-10 sm:row-span-2 sm:row-start-1"
            }
          >
            <ShareCard postcardId={postcard.id} />
          </div>
        </div>
        <CardComponent card={postcard} />
      </div>
    </>
  );
};

export default Page;
