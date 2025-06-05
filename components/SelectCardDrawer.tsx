"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { useSelection } from "@/components/providers/SelectionProvider";
import { useCarousel } from "@/lib/hooks/useCarousel";
import DrawerHeader from "./DrawerHeader";
import CardCarousel from "./CardCarousel";
import MobileLocationDrawer from "./MobileLocationDrawer";
import LocationDrawerToggle from "./LocationDrawerToggle";
import DesktopLocationList from "./DesktopLocationList";

const CardsDrawer = () => {
  const {
    locations,
    selectedLocation,
    setSelectedLocation,
    filteredPostcards,
  } = useSelection();

  const [isMobileLocationsOpen, setMobileLocationsOpen] = useState(false);

  // Centralize carousel logic
  const carouselRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const { activeIndex, setActiveIndex } = useCarousel(
    filteredPostcards.length,
    carouselRef,
    listRef,
    selectedLocation?.id,
  );

  return (
    <AnimatePresence>
      {/* Main Drawer for selected location */}
      {selectedLocation && (
        <motion.div
          key="main"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-x-0 bottom-0 z-20 flex flex-col rounded-t-4xl bg-white p-6 shadow-md md:rounded-none xl:left-80 xl:min-h-3/5"
        >
          <DrawerHeader name={selectedLocation.name} />

          <div className="mt-5 flex flex-1 overflow-hidden md:mt-6">
            <DesktopLocationList
              postcards={filteredPostcards}
              activeIndex={activeIndex}
              onSelect={setActiveIndex}
            />

            <div className="flex flex-1 flex-col overflow-y-auto">
              <CardCarousel
                ref={carouselRef}
                listRef={listRef}
                postcards={filteredPostcards}
                activeIndex={activeIndex}
                onPrev={() => setActiveIndex(activeIndex - 1)}
                onNext={() => setActiveIndex(activeIndex + 1)}
                onSelect={(index) => setActiveIndex(index)}
              />

              <div className="mt-8 flex flex-col items-center gap-2 md:mt-5">
                <Link
                  href={`/postcards/templates/${filteredPostcards[activeIndex]?.slug}`}
                  className="w-full max-w-sm rounded-lg border-2 border-[#007092] bg-[#007092] py-5 text-center text-white shadow-md hover:bg-[#007092]/80"
                >
                  Create your Postcard
                </Link>
                <button
                  onClick={() => {
                    setSelectedLocation(null);
                    setMobileLocationsOpen(false);
                  }}
                  className="mb-2 w-full max-w-sm rounded-lg border-2 border-[#007092] bg-white py-5 text-center text-[#007092] hover:cursor-pointer hover:text-[##007092]/80 md:hidden"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Mobile "Explore Locations" Button */}
      {!isMobileLocationsOpen && (
        <LocationDrawerToggle onClick={() => setMobileLocationsOpen(true)} />
      )}

      {/* Mobile Locations Drawer */}
      {isMobileLocationsOpen && (
        <MobileLocationDrawer
          locations={locations}
          selectedId={selectedLocation?.id}
          onSelect={(location) => {
            setSelectedLocation(location);
            setMobileLocationsOpen(false);
          }}
          onClose={() => setMobileLocationsOpen(false)}
        />
      )}
    </AnimatePresence>
  );
};

export default CardsDrawer;
