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
        "border-2 border-white bg-[#BEA568] px-12 py-2 text-lg text-white hover:cursor-pointer"
      }
    >
      Prijavi se
    </button>
  );
};

export default ScrollToSignup;
