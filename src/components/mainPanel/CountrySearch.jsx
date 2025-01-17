import React, { useState } from 'react';
import { Input, Listbox, ListboxItem } from '@nextui-org/react';
import countryList from '../../utils/countryList';


// Componente para buscar países en la página de localización si el usuario está logueado
const CountrySearch = ({ onSelectCountry }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filtrar países si el término tiene más de 3 letras
    if (value.length > 3) {
      const results = countryList.filter((country) =>
        // los busco en inglés y en español
        country.name.toLowerCase().includes(value.toLowerCase()) || country.nombre.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCountries(results);
    } else {
      setFilteredCountries([]);
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
            onPress={() => handleSelectCountry(country)}
          >
            {`${country.nombre}  -  ${country.name}`}
          </ListboxItem>
        ))}
      </Listbox>
    </div>
  );
};

export default CountrySearch;