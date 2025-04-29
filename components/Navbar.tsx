import React from "react";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center py-4 px-16 bg-white/70 backdrop-blur-md shadow-md">
      <div className="flex items-center space-x-2">
        <Image src="/next.svg" alt="Postcard" width={32} height={32} />
        <span className="font-bold text-lg">Postcard</span>
      </div>
    </div>
  );
};

export default Navbar;
