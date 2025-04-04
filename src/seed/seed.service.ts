import { Injectable } from '@nestjs/common';
import axios from 'axios';
import {  PokeResponse, Result } from './interface/poke.response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';


@Injectable()
export class SeedService {
  
  constructor(
  
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>,
    private readonly pokemonService: PokemonService,
  ) {}

   async executeSeed() {
    
    await this.pokemonService.deleteAllPokemon();
    const { data } = await axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

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
