const locations = [
  { id: 1, title: "Zagreb", coords: [15.9819, 45.815] as [number, number] },
  { id: 2, title: "Split", coords: [16.4402, 43.5081] as [number, number] },
  {
    id: 3,
    title: "Dubrovnik",
    coords: [18.0944, 42.6507] as [number, number],
  },
  { id: 4, title: "Zadar", coords: [15.2314, 44.1194] as [number, number] },
  { id: 5, title: "Solin", coords: [16.4884, 43.5396] as [number, number] },
];

export const getLocations = () => locations;

const postcardsByLocation: Record<
  number,
  { id: number; title: string; image: string }[]
> = {
  1: [
    { id: 101, title: "Zagreb Cathedral", image: "/postcards/zagreb1.jpg" },
    { id: 102, title: "Ban Jelačić Square", image: "/postcards/zagreb2.jpg" },
  ],
  2: [
    { id: 201, title: "Diocletian's Palace", image: "/postcards/split1.jpg" },
    { id: 202, title: "Marjan Hill", image: "/postcards/split2.jpg" },
  ],
  3: [
    { id: 301, title: "Old Town Walls", image: "/postcards/dubrovnik1.jpg" },
    { id: 302, title: "Stradun", image: "/postcards/dubrovnik2.jpg" },
  ],
  4: [
    { id: 401, title: "Sea Organ", image: "/postcards/zadar1.jpg" },
    { id: 402, title: "Sun Salutation", image: "/postcards/zadar2.jpg" },
  ],
  5: [
    { id: 501, title: "Solin Antiquity", image: "/postcards/solin1.jpg" },
    { id: 502, title: "Salona Ruins", image: "/postcards/solin2.jpg" },
  ],
};

export const getPostcardsByLocation = () => postcardsByLocation;
