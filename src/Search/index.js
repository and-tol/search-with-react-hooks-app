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
            const name = country.Name.replace(
              regexp,
              `<span class="highlight" style="color: green" >${filter}</span>`
            );
            const region = country.Region.replace(
              regexp,
              `<span class="highlight" style="color: orange" >${filter}</span>`
            );

            return (
              <li key={country.Flag}>
                <span
                  dangerouslySetInnerHTML={{ __html: `${name} ${region}` }}
                />
                <img width="30" src={country.Flag} alt={country.Name}  style={{marginLeft: "10px"}} />

                {/* <span>{country.emoji}</span> */}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
