/**
 * Uses https://my-json-server.typicode.com/Louis-Procode/ufo-Sightings/db
 *
 * Base URL: https://my-json-server.typicode.com/Louis-Procode/ufo-Sightings
 */

import { client } from '@/lib/api/client';

import type { UFOSightingsAPIErrorResponse } from '../utils';

import type { Db } from './types';

const ENDPOINT = '/db';

export async function getSightingsDb(options?: { signal?: AbortSignal }) {
  // Send a GET request to the API to fetch UFO sightings above Procode HQ
  const response = await client.get<Db, UFOSightingsAPIErrorResponse>(ENDPOINT, {}, options);

  if (!response.ok) throw new Error(response.data?.message);

  // Return the fetched data
  return response.data;
}
