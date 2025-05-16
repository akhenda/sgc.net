import { create } from 'apisauce';
import type { AxiosError } from 'axios';
import Axios from 'axios';

import { CONFIG } from '../../constants';
import { logger } from '../logger';

function errorResponseInterceptor(error: AxiosError & { response: Response }) {
  const status = error.response ? error.response.status : null;

  if (
    error.code === 'ERR_CANCELED' ||
    error.code === 'ECONNABORTED' ||
    error.code === 'TIMEOUT_ERR'
  ) {
    // aborted in useEffect cleanup
    return Promise.resolve({ status: 499 });
  }

  if (status === 401) {
    // Handle unauthorized access
    logger.error('Unauthorized access', error).toast('Unauthorized access', {
      description: 'You are not authorized to access this resource.',
    });
  } else if (status === 404) {
    // Handle not found errors
    logger.error('Not found', error).toast('Resource not found', {
      description: 'The requested resource was not found.',
    });
  } else {
    // Handle other errors
    const msg = 'An API error occurred';
    logger.error('API error', error).toast('API Error', { description: msg });
  }

  return Promise.reject(error);
}

export const axios = Axios.create({ baseURL: CONFIG.apiBaseURL });
export const client = create({ axiosInstance: axios, baseURL: CONFIG.apiBaseURL });

axios.interceptors.response.use((res) => res, errorResponseInterceptor);
