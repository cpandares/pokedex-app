import { Injectable } from '@nestjs/common';

import {  PokeResponse, Result } from './interface/poke.response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adpters/axios.adapter';


@Injectable()
export class SeedService {
  
  constructor(
  
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>,
    private readonly pokemonService: PokemonService,
    private readonly axiosAdapter: AxiosAdapter,
  ) {}

   async executeSeed() {
    
    await this.pokemonService.deleteAllPokemon();
    const  data  = await this.axiosAdapter.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    const pokemonToInsert: { name: string, no: number }[] = [];
    
    const pokemons = data.results.map(({ name, url }) => {
      const segments = url.split('/');
      const no:number = +segments[segments.length - 2];
     
      pokemonToInsert.push({ name, no }); 
    });
    await this.pokemonModel.insertMany(pokemonToInsert);

   return 'Seed executed';
  }

/* npm install axios@0.27.2 */
}
