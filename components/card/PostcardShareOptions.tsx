import { copyUrlToClipboard } from "@/lib/helpers";
import Link from "next/link";
import Image from "next/image";
import CopyLinkIcon from "@/public/copy.webp";
import FacebookIcon from "@/public/fb.webp";
import WhatsappIcon from "@/public/wapp.webp";
import XIcon from "@/public/x.webp";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const PostcardShareOptions = ({ slug }: { slug: string }) => {
  const url = `${process.env.NEXT_PUBLIC_URL}/postcards/${slug}`;
  return (
    <TooltipProvider>
      <div className={"flex w-full items-center justify-center gap-2"}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <button
                className={
                  "flex w-10 items-center justify-center hover:cursor-pointer"
                }
                onClick={() => copyUrlToClipboard(url as string)}
              >
                <Image
                  className={"w-full"}
                  src={CopyLinkIcon}
                  alt={"Copy link icon"}
                />
              </button>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <span>Copy</span>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <Link
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
              target="_blank"
              prefetch={false}
            >
              <div className={"flex w-10 items-center justify-center"}>
                <Image
                  className={"w-full"}
                  src={FacebookIcon}
                  alt={"Facebook icon"}
                />
              </div>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <span>Share via Facebook</span>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <Link
              href={`https://wa.me/send?text=${encodeURIComponent(`${url}`)}`}
              target="_blank"
              prefetch={false}
            >
              <div className={"flex w-10 items-center justify-center"}>
                <Image
                  className={"w-full"}
                  src={WhatsappIcon}
                  alt={"Whatsapp icon"}
                />
              </div>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <span>Share via Whatsapp</span>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <Link
              href={`https://x.com/intent/tweet?text=${encodeURIComponent(
                `${url}`,
              )}`}
              target="_blank"
              prefetch={false}
            >
              <div className={"flex w-10 items-center justify-center"}>
                <Image className={"w-full"} src={XIcon} alt={"X icon"} />
              </div>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <span>Share via X</span>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default PostcardShareOptions;
