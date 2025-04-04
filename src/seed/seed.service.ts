import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PokeResponse } from './interface/poke.response.interface';


@Injectable()
export class SeedService {
  
   async executeSeed() {

    const { data } = await axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10');
    
    const pokemons = data.results.map(({ name, url }) => {
      const segments = url.split('/');
      const no:number = +segments[segments.length - 2];
      return { no, name };
    });

    console.log(pokemons);
    return pokemons;
  }

/* npm install axios@0.27.2 */
}
