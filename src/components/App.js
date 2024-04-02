import React, { useState } from 'react';
import Filters from './Filters';
import PetBrowser from './PetBrowser';

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: 'all' });

  const onChangeType = (event) => {
    setFilters({ type: event.target.value });
  };

  const onFindPetsClick = () => {
    let url = 'http://192.168.0.7:3000/pets';
    if (!(filters.type === 'all')) {
      url += `?type=${filters.type}`;
    }
    fetch(url)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('Network Error, could not fetch resource');
        }
        return resp.json();
      })
      .then((data) => setPets(data));
  };

  const onAdoptPet = (id) => {
    const petToAdopt = pets.map((pet) => {
      return pet.id === id ? { ...pet, isAdopted: true } : pet;
    });
    setPets(petToAdopt);
  };

  return (
    <div className='ui container'>
      <header>
        <h1 className='ui dividing header'>React Animal Shelter</h1>
      </header>
      <div className='ui container'>
        <div className='ui grid'>
          <div className='four wide column'>
            <Filters
              onChangeType={onChangeType}
              onFindPetsClick={onFindPetsClick}
            />
          </div>
          <div className='twelve wide column'>
            <PetBrowser pets={pets} onAdoptPet={onAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
