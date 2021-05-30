const MAIN_URI = 'htpps://lab.lectrum.io';

export const api = Object.freeze({
  getContries: async (filter = '') => {
    const response = await fetch(
      `${MAIN_URI}/geo/api/countries?filter=${filter}?size=50`
    );

    const { data } = await response.json();

    return data;
  },
});
