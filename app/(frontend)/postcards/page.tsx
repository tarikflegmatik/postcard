import { getLocations, getPostcardsByLocation } from "@/lib/data";
import LocationSidebar from "@/components/LocationSidebar";
import { SelectionProvider } from "@/components/providers/SelectionProvider";
import Map from "@/components/Map";
import CardsDrawer from "@/components/CardsDrawer";

const Page = async () => {
  const [locations, postcards] = await Promise.all([
    getLocations(),
    getPostcardsByLocation(),
  ]);

  return (
    <div className="flex h-screen w-screen overflow-visible pt-16">
      <SelectionProvider locations={locations} postcardsByLocation={postcards}>
        {/* Sidebar */}
        <LocationSidebar />
        <div className={"relative flex-1"}>
          <Map />
          <CardsDrawer />
        </div>
      </SelectionProvider>
    </div>
  );
};

export default Page;
