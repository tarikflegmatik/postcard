import Image from "next/image";
import { RefreshRouteOnSave } from "@/components/RefrechRouteOnSave";
import { notFound } from "next/navigation";
import { getCachedLandmark } from "@/lib/data";
import OrientationWarning from "@/components/OrientationWarning";
import { LandmarkLocation, Media, Postcard } from "@/lib/types/payload-types";
import StaticLocationMap from "@/components/StaticLocationMap";
import LandmarkPostcardCarousel from "@/components/LandmarkPostcardCarousel";

const Page = async ({
  params,
}: {
  params: Promise<{ landmarkSlug: string }>;
}) => {
  const { landmarkSlug } = await params;

  const landmark = await getCachedLandmark(landmarkSlug);
  if (!landmark) return notFound();

  return (
    <>
      <RefreshRouteOnSave />
      <OrientationWarning />
      <div
        className={
          "flex min-h-screen w-full flex-col items-center justify-center bg-gray-200 pt-16"
        }
      >
        {landmark.pageContent.backgroundImage && (
          <div className={"fixed top-0 left-0 z-0 h-screen w-full"}>
            <Image
              src={(landmark.pageContent.backgroundImage as Media).url || ""}
              alt={(landmark.pageContent.backgroundImage as Media).alt || ""}
              className={"object-cover"}
              fill
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        )}
        <div
          className={
            "relative z-10 w-full grid-cols-12 gap-y-2 p-6 sm:p-16 md:gap-y-4"
          }
        >
          <div
            className={
              "col-span-12 col-start-1 row-span-1 row-start-1 md:col-span-8 lg:col-span-6"
            }
          >
            <h3 className={"text-xl font-normal text-white md:text-3xl"}>
              {landmark.pageContent.subtitle}
            </h3>
          </div>
          <div
            className={
              "col-span-12 col-start-1 row-span-1 row-start-2 md:col-span-8 lg:col-span-6"
            }
          >
            <h1 className={"text-5xl font-bold text-white md:text-6xl"}>
              {landmark.pageContent.title}
            </h1>
          </div>
          <div
            className={
              "col-span-12 grid sm:col-span-3 sm:col-start-10 sm:row-span-2 sm:row-start-1"
            }
          >
            {/*  Used to hold the Share CTA  */}
          </div>
        </div>
        <div
          className={
            "relative z-10 mb-8 flex w-full flex-col items-center justify-center gap-12 px-6 sm:mb-16 sm:px-16 xl:mb-0 xl:flex-row xl:items-stretch xl:gap-0"
          }
        >
          <div
            className={
              "flex w-full flex-col items-center lg:max-w-[1020px] xl:flex-1/3"
            }
          >
            <h3
              className={
                "mb-5 w-full text-start text-3xl font-semibold text-white md:text-4xl"
              }
            >
              Postcards
            </h3>
            {landmark.postcards && (
              <LandmarkPostcardCarousel
                postcards={landmark.postcards as Postcard[]}
              />
            )}
          </div>
          <div className={"flex w-full flex-col lg:max-w-[1020px] xl:flex-1"}>
            <h3
              className={
                "mb-5 text-start text-3xl font-semibold text-white md:text-4xl"
              }
            >
              Find us here
            </h3>
            <h5 className={"mb-6 text-lg text-white"}>
              {(landmark.location as LandmarkLocation).street}
            </h5>
            <div className={"relative h-0 min-h-[400px] w-full flex-1"}>
              <StaticLocationMap
                location={landmark.location as LandmarkLocation}
                view={(landmark.location as LandmarkLocation).coords}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
