export type Sighting = {
  date: string; // uses format DD/MM/YYYY
  sightings: number;
};

export type Sightings = Sighting[];
export type Db = { sightings: Sightings };

export type SightingsWithStats = {
  first: Sighting | null;
  last: Sighting | null;
  most: Sighting | null;
  least: Sighting | null;
  data: Sightings;
};
