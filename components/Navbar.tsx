import React from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="absolute top-0 right-0 left-0 z-10 flex items-center justify-between bg-white/70 px-6 py-4 shadow-md backdrop-blur-md sm:px-16">
      <Link href="/">
        <div className="flex items-center space-x-2">
          <Image src="/next.svg" alt="Postcard" width={32} height={32} />
          <span className="text-lg font-bold">Postcard</span>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
