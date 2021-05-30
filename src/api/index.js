const MAIN_URI = 'https://lab.lectrum.io';

export const api = Object.freeze({
  getContries: async (filter = '', size = 50) => {
    const response = await fetch(
      `${MAIN_URI}/geo/api/countries?filter=${filter}&size=${size}`
    );

    const { data } = await response.json();

    return data;
  },
});
