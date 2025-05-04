import Image from "next/image";
import StampYoursDigitallyImage from "@/public/markica-zadnja.webp";

const Page = () => {
  return (
    <div className={"flex min-h-screen w-full items-center justify-center"}>
      <div className={"w-7/12 max-w-96"}>
        <Image
          src={StampYoursDigitallyImage}
          alt={"Your's Digitally Stamp Image"}
        />
      </div>
    </div>
  );
};

export default Page;
