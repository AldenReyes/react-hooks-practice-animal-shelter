import React from 'react';
import Pet from './Pet';

function PetBrowser({ pets, onAdoptPet }) {
  if (pets) {
    return pets.map((pet) => {
      return (
        <div key={pet.id} className='ui cards'>
          <Pet pet={pet} onAdoptPet={onAdoptPet} />
        </div>
      );
    });
  } else {
    return (
      <div className='ui cards'>Pet cards failed to load. Please Refresh.</div>
    );
  }
}

export default PetBrowser;
