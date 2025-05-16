import React from "react";

type DrawerHeaderProps = {
  name: string;
};

const DrawerHeader: React.FC<DrawerHeaderProps> = ({ name }) => (
  <div className="mb-4 text-left md:text-center">
    <h3 className="text-2xl font-bold">{name}</h3>
    <p className="text-gray-600">Select your favorite postcard design</p>
  </div>
);

export default DrawerHeader;
