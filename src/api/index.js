const MAIN_URI_LECTRUM = 'https://lab.lectrum.io';
const MAIN_URI_COUNTRI = 'http://countryapi.gear.host/v1/Country/getCountries'; // https://fabian7593.github.io/CountryAPI/

// pLimit - Limit of objects response

export const api = Object.freeze({
  getContries: async (filter = '', pLimit = 50) => {
    const res = await fetch(
      `${MAIN_URI_COUNTRI}?pName=${filter}&pLimit=${pLimit}`
    );

    const { Response } = await res.json();
      console.log(Response)
    return Response;
  },
  getContriesLectrum: async (filter = '', size = 50) => {
    const response = await fetch(
      `${MAIN_URI_LECTRUM}/geo/api/countries?filter=${filter}&size=${size}`
    );

    const { data } = await response.json();

    return data;
  },
});
