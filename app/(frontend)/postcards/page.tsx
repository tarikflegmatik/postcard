import { getLocations, getPostcardTemplatesByLocation } from "@/lib/data";
import LocationSidebar from "@/components/LocationSidebar";
import { SelectionProvider } from "@/components/providers/SelectionProvider";
import Map from "@/components/Map";
import SelectCardDrawer from "@/components/SelectCardDrawer";

const Page = async () => {
  const [locations, postcards] = await Promise.all([
    getLocations(),
    getPostcardTemplatesByLocation(),
  ]);

  return (
    <div className="flex h-screen w-screen items-start overflow-visible">
      <SelectionProvider locations={locations} postcardsByLocation={postcards}>
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
