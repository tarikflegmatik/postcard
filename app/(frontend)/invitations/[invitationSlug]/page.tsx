import Image from "next/image";
import { RefreshRouteOnSave } from "@/components/RefrechRouteOnSave";
import { notFound } from "next/navigation";
import CardComponent from "@/components/card/Card";
import { getCachedInvitation, getInvitations } from "@/lib/data";
import RegisterForm from "@/components/RegisterForm";
import OrientationWarning from "@/components/OrientationWarning";
import { Media } from "@/lib/types/payload-types";
import SponsorLogos from "@/components/SponsorLogos";

export const generateStaticParams = async () => {
  const invitations = await getInvitations();

  return invitations.map((invitation) => ({
    invitationSlug: invitation.slug,
  }));
};

const Page = async ({
  params,
}: {
  params: Promise<{ invitationSlug: string }>;
}) => {
  const { invitationSlug } = await params;

  const invitation = await getCachedInvitation(invitationSlug);
  if (!invitation) return notFound();

  return (
    <>
      <RefreshRouteOnSave />
      <OrientationWarning />
      <div
        className={
          "flex min-h-screen w-full flex-col items-center justify-center bg-gray-200 pt-16"
        }
      >
        {invitation.pageContent.backgroundImage && (
          <div className={"fixed top-0 left-0 z-0 h-screen w-full"}>
            <Image
              src={(invitation.pageContent.backgroundImage as Media).url || ""}
              alt={(invitation.pageContent.backgroundImage as Media).alt || ""}
              className={"object-cover"}
              fill
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        )}
        <div
          className={
            "relative z-10 hidden w-full grid-cols-12 gap-y-2 p-6 sm:p-16 md:gap-y-4 lg:grid"
          }
        >
          <div
            className={
              "col-span-12 col-start-1 row-span-1 row-start-1 md:col-span-8 lg:col-span-6"
            }
          >
            <h3 className={"text-xl font-normal text-white md:text-3xl"}>
              {invitation.pageContent.subtitle}
            </h3>
          </div>
          <div
            className={
              "col-span-12 col-start-1 row-span-1 row-start-2 md:col-span-8 lg:col-span-6"
            }
          >
            <h1 className={"text-5xl font-bold text-white md:text-6xl"}>
              {invitation.pageContent.title}
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
            "relative z-10 mb-16 flex w-full flex-col items-center justify-center gap-12 px-6 sm:px-16 xl:mb-0 xl:flex-row xl:items-start xl:gap-0"
          }
        >
          <div
            className={
              "mb-16 flex w-full flex-col items-center lg:max-w-[1020px] xl:flex-1/3"
            }
          >
            <CardComponent
              type={"invitation"}
              lang={"croatian"}
              card={invitation}
            />
            <SponsorLogos />
          </div>
          <div className={"mb-16 w-full lg:max-w-[1020px] xl:flex-1"}>
            <RegisterForm invitationId={invitation.id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
