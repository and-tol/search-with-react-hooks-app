import { useState, useEffect } from 'react';

import { api } from '../api';
import { delay } from '../instruments';

export const Search = () => {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const getCountries = async () => {
    try {
      setIsFetching(true);
      const filtredCountries = await api.getContries(filter.trim());
      // delay simulation
      await delay(200);
      setCountries(filtredCountries);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

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
    </section>
  );
};
