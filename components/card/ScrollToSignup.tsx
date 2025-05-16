"use client";

const ScrollToSignup = () => {
  const scrollToSignup = () => {
    const target = document.querySelector("#sign-up-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={scrollToSignup}
      className={
        "w-full max-w-[150px] border-2 border-white bg-[#BEA568] py-1 text-center text-sm text-white hover:cursor-pointer sm:text-base md:max-w-[220px] md:py-2 md:text-xl lg:max-w-[290px] lg:py-4"
      }
    >
      Prijavi se
    </button>
  );
};

export default ScrollToSignup;
