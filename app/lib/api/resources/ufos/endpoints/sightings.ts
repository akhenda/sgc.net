/**
 * Uses https://my-json-server.typicode.com/Louis-Procode/ufo-Sightings/ufoSightings
 *
 * Base URL: https://my-json-server.typicode.com/Louis-Procode/ufo-Sightings
 */

import { client } from '@/lib/api/client';

import type { UFOSightingsAPIErrorResponse } from '../utils';

import type { Sighting, Sightings } from './types';

const ENDPOINT = '/ufoSightings';

export async function getSightings(options?: { signal?: AbortSignal }) {
  // Send a GET request to the API to fetch UFO sightings above Procode HQ
  const response = await client.get<Sightings, UFOSightingsAPIErrorResponse>(ENDPOINT, {}, options);

  if (!response.ok) throw new Error(response.data?.message);
  if (!response.data) return { first: null, last: null, most: null, least: null, data: [] };

  // let's transform the data here to get some stats
  const sightings = response.data;
  const { 0: first, [sightings.length - 1]: last } = sightings;
  const { most, least } = (() => {
    let most: Sighting = { date: '', sightings: 0 };
    let least: Sighting = { date: '', sightings: Number.POSITIVE_INFINITY };

    sightings.forEach((sighting) => {
      if (sighting.sightings > most?.sightings) most = sighting;
      if (sighting.sightings < least?.sightings) least = sighting;
    });

    return { most, least };
  })();

  // Return the transformed data
  return { first, last, most, least, data: sightings };
}
