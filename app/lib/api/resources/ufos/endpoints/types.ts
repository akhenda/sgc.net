export type Sighting = {
  date: string; // uses format DD/MM/YYYY
  sightings: number;
};

export type Sightings = Sighting[];
export type Db = { sightings: Sightings };
