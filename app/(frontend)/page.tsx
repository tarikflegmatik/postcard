import { getCachedLocations, getPostcardTemplatesByLocation } from "@/lib/data";
import LocationSidebar from "@/components/LocationSidebar";
import { SelectionProvider } from "@/components/providers/SelectionProvider";
import Map from "@/components/Map";
import SelectCardDrawer from "@/components/SelectCardDrawer";

const Page = async () => {
  const [locationsRaw, postcardsByLocation] = await Promise.all([
    getCachedLocations(),
    getPostcardTemplatesByLocation(),
  ]);

  // Filter only locations that got some postcards assigned
  const locations = locationsRaw.filter(
    (location) => postcardsByLocation[location.id.toString()],
  );

  return (
    <div className="flex h-screen w-screen items-start overflow-visible">
      <SelectionProvider
        locations={locations}
        postcardsByLocation={postcardsByLocation}
      >
        <LocationSidebar />
        <div className={"relative h-full flex-1"}>
          <Map />
          <SelectCardDrawer />
        </div>
      </SelectionProvider>
    </div>
  );
};

export default Page;
