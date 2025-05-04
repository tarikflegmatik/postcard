import * as motion from "motion/react-client";
import Image from "next/image";
import StampImage from "@/public/markica.webp";
import SealImage from "@/public/pecat.png";

const SplashScreen = () => (
  <motion.div
    initial={{ y: 0, opacity: 1 }}
    animate={{ y: -1000, opacity: 0 }}
    transition={{ delay: 2, duration: 1 }}
    className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-white"
  >
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0, duration: 2 }}
      className="relative flex w-72 items-center justify-center"
    >
      <Image src={StampImage} alt="Stamp Image" />

      <motion.div
        initial={{ opacity: 0, y: 100, scale: 1.5, rotate: -45 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          rotate: 0,
        }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-0 left-0 w-72 -translate-x-1/2 transform"
      >
        <Image src={SealImage} alt="Seal Image" />
      </motion.div>
    </motion.div>
  </motion.div>
);

export default SplashScreen;
