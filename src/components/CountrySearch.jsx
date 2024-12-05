// CountrySearch.jsx
import React, { useState } from 'react';
import { Input, Listbox, ListboxItem } from '@nextui-org/react';
import CountryList from './CountryList'; // Asegúrate de tener esta lista de países

const CountrySearch = ({ onSelectCountry }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  // Manejador de cambios en el input
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filtrar países si el término tiene más de 3 letras
    if (value.length > 3) {
      const results = CountryList.filter((country) =>
        country.name.toLowerCase().includes(value.toLowerCase()) || country.nombre.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCountries(results);
      console.log(results);
    } else {
      setFilteredCountries([]); // Vacía resultados si hay menos de 3 letras
    }
  };

  // Manejador de selección de país
  const handleSelectCountry = (country) => {
    onSelectCountry(country);
    setSearchTerm('');  // Limpiar el campo de búsqueda al seleccionar un país
    setFilteredCountries([]);  // Limpiar la lista de países
  };

  return (
    <div style={{ width: '300px', margin: '0 auto' }}>
      <Input
        clearable
        bordered
        label="Busca un país"
        value={searchTerm}
        onChange={handleSearch}
        css={{ marginBottom: '1rem' }}
      />
      <Listbox
      emptyContent="No hay paises con ese filtro">
        {filteredCountries.map((country, index) => (
          <ListboxItem
            key={index}
            textValue={country.name}
            onClick={() => handleSelectCountry(country)}
          >
            {country.name}
          </ListboxItem>
        ))}
      </Listbox>
    </div>
  );
};

export default CountrySearch;
