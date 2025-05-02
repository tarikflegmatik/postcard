import { incrementShareAnalytic } from "@/lib/mutations";

const SharePostcard = ({ postcardId }: { postcardId: number }) => {
  return (
    <form
      action={async () => {
        "use server";
        incrementShareAnalytic(postcardId);
      }}
    >
      <button
        className={
          "mt-6 justify-self-start rounded-lg border bg-black px-4 py-2 text-white hover:cursor-pointer hover:bg-white hover:text-black sm:mt-0 sm:self-end sm:justify-self-end"
        }
        type="submit"
      >
        Share Postcard
      </button>
    </form>
  );
};

export default SharePostcard;
