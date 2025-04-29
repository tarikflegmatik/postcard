import * as motion from "motion/react-client";

const SplashScreen = () => {
  const letters = "Postcard".split("");

  return (
    <motion.div
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: -1000, opacity: 0 }}
      transition={{ delay: 4, duration: 1 }}
      className="pointer-events-none fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-white"
    >
      {/* Animated Title */}
      <motion.div
        className="mb-8 flex text-4xl font-bold"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            className="inline-block"
            variants={{
              hidden: {
                opacity: 0,
                y: index % 2 === 0 ? -50 : 50,
              },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                },
              },
            }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>

      {/* Three Boxes */}
      <motion.div className="relative mt-4 flex items-center justify-center space-x-[-40px]">
        <motion.div
          initial={{ opacity: 0, rotate: -8, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="h-48 w-32 rounded-md bg-blue-300 shadow-lg"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="z-10 h-48 w-32 rounded-md bg-green-300 shadow-lg"
        />
        <motion.div
          initial={{ opacity: 0, rotate: 8, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="h-48 w-32 rounded-md bg-pink-300 shadow-lg"
        />
      </motion.div>

      {/* Explore Postcards with bouncing styled dots */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="mt-12 flex items-center space-x-2 text-lg font-medium text-gray-700"
      >
        <span>Explore Postcards</span>
        <div className="ml-2 flex space-x-1">
          {Array.from({ length: 3 }).map((_, i) => {
            const delay = i * 0.2; // 0, 0.2, 0.4
            return (
              <motion.div
                key={i}
                className="h-2 w-2 rounded-full bg-gray-700"
                animate={{ y: [0, -5, 0] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 0.6,
                  delay: delay,
                }}
              />
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
