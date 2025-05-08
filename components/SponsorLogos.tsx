import * as motion from "motion/react-client";
import Image from "next/image";

import EtsLogo from "@/public/ets.webp";
import TusLogo from "@/public/tus.webp";
import UnistLogo from "@/public/sveuciliste-u-splitu-logo.webp";
import HajdukLogo from "@/public/hajduk-logo.webp";
import DalmatiaLogo from "@/public/logo-new.png";
import SdzLogo from "@/public/logo-sdz-new.png";
import GovLogo from "@/public/mint-logo.png";
import MestrovicLogo from "@/public/tmestrovic.webp";

const logos = [
  { src: TusLogo, alt: "TusLogo" },
  { src: EtsLogo, alt: "EtsLogo" },
  { src: UnistLogo, alt: "UnistLogo" },
  { src: HajdukLogo, alt: "HajdukLogo" },
  { src: DalmatiaLogo, alt: "DalmatiaLogo" },
  { src: SdzLogo, alt: "SdzLogo" },
  { src: MestrovicLogo, alt: "MestrovicLogo" },
  { src: GovLogo, alt: "GovLogo" },
];

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 2.5,
      duration: 0.4,
      staggerChildren: 0.2,
      delayChildren: 2.5,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// Height 36px

const SponsorLogos = () => {
  return (
    <motion.div
      className="mt-12 flex h-fit w-full items-center justify-around gap-4 bg-white p-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {logos.map((logo, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className={"h-9 w-auto"}
        >
          <Image
            className="h-full w-auto object-contain"
            src={logo.src}
            alt={logo.alt}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SponsorLogos;
