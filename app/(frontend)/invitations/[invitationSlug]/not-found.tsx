import React from "react";
import Navbar from "@/components/Navbar";

const NotFound = () => {
  return (
    <div
      className={
        "flex min-h-screen w-full flex-col items-center justify-center bg-gray-200"
      }
    >
      <Navbar />
      <h1 className={"text-5xl md:text-6xl"}>Not found</h1>
    </div>
  );
};

export default NotFound;
