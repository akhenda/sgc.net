/**
 * Uses https://my-json-server.typicode.com/Louis-Procode/ufo-Sightings/ufoSightings
 *
 * Base URL: https://my-json-server.typicode.com/Louis-Procode/ufo-Sightings
 */

import { client } from '@/lib/api/client';

import type { UFOSightingsAPIErrorResponse } from '../utils';

import type { Sightings } from './types';

const ENDPOINT = '/ufoSightings';

export async function getSightings(options?: { signal?: AbortSignal }) {
  // Send a GET request to the API to fetch UFO sightings above Procode HQ
  const response = await client.get<Sightings, UFOSightingsAPIErrorResponse>(ENDPOINT, {}, options);

  if (!response.ok) throw new Error(response.data?.message);

  // Return the fetched data
  return response.data;
}
