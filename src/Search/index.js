import { useState, useEffect } from 'react';

import { api } from '../api';
import { delay } from '../instruments';

import { useDebounce } from './useDebounce';

export const Search = () => {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const getCountries = async () => {
    try {
      setIsFetching(true);
      const filtredCountries = await api.getContries(filter.trim());
      // delay simulation
      // await delay(200);
      setCountries(filtredCountries);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  const debouncedFilter = useDebounce(filter, 500);
  useEffect(() => {
    getCountries();
  }, [debouncedFilter]);

  const regexp = new RegExp(filter, 'g');

  return (
    <section>
      <span>Strange</span>
      <input
        placeholder='Welcome'
        type='text'
        value={filter}
        onChange={event => setFilter(event.target.value)}
      />
      <span>Search</span>
      <div>
        <ul>
          {countries.map(country => {
            const name = country.name.replace(
              regexp,
              `<span class="highlight" style="color: yellow" >${filter}</span>`
            );
            const continent = country.continent.replace(
              regexp,
              `<span class="highlight" style="color: yellow" >${filter}</span>`
            );

            return (
              <li key={country.emoji}>
                <span
                  dangerouslySetInnerHTML={{ __html: `${name} ${continent}` }}
                />
                <span>{country.emoji}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
