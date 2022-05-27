import baseUrl from 'shared/constants';

const responseHandling = async (response: Response) => {
  if (response.ok) {
    return response.json();
  }
  throw new Error(response.statusText);
};

const errorHandling = (error: any) => {
  if (error instanceof Error) {
    return Promise.reject(error?.message ? error.message : new Error('Error'));
  }
  return Promise.reject(new Error('Error'));
};

export default {
  getPostIds: async () => {
    try {
      const response = await fetch(`${baseUrl}/topstories.json`);
      return await responseHandling(response);
    } catch (error) {
      return errorHandling(error);
    }
  },
  getPostById: async (id: string) => {
    try {
      const response = await fetch(`${baseUrl}/item/${id}.json`);
      return await responseHandling(response);
    } catch (error) {
      return errorHandling(error);
    }
  },
};
