import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';

import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PokemonService {

  private defaultLimit: number;

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService,
  ){
   
    this.defaultLimit = configService.get<number>('DEFAULT_LIMIT') || 10;
  }


  async create(createPokemonDto: CreatePokemonDto) {
    try {
      createPokemonDto.name = createPokemonDto.name.toLowerCase().trim();
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.customErrorDuplicatedPokemon(error);
      
    }
    
  }

 async findAll(paginationDto: PaginationDto) {
  const { limit = this.defaultLimit, offset = 0 } = paginationDto;
    return await this.pokemonModel.find()
                      .limit(limit)
                      .skip(offset)
                      .sort({ no: 1 })
                      .select('-__v')
  }

  async findOne(term: string) {
    
    let pokemon: Pokemon | null = null;

    if(!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });

    }

    /* Mongo ID */

    if( !pokemon && isValidObjectId(term) ) {
      pokemon = await this.pokemonModel.findById(term);
    }

    /* Name */
    if( !pokemon ) {
      pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase().trim() });
    }

    if (!pokemon) {
      throw new NotFoundException(`Pokemon with term "${term}" not found`);
    }



    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);

    try {
      
      if (updatePokemonDto.name) {
        updatePokemonDto.name = updatePokemonDto.name.toLowerCase().trim();
      }

    const updatePokemons =  await pokemon.updateOne(updatePokemonDto, { new: true });
      return {
        ...pokemon.toJSON(),
        ...updatePokemons,
      }

    } catch (error) {
     this.customErrorDuplicatedPokemon(error);
    }

    
  }

  async remove(id: string) {
    //const pokemon = await this.findOne(id);
    
   // const pokeDelete = await this.pokemonModel.findByIdAndDelete(id);
   const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });

    if ( deletedCount === 0) {
      throw new BadRequestException(`Pokemon with id "${id}" not found`);
    }

    return ;

  }

  private customErrorDuplicatedPokemon( error: any ) {
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon already exists in DB ${JSON.stringify(error.keyValue)}`);
    } else {
      throw new InternalServerErrorException(`Unknown error: ${error}`);
    }
  }

  async deleteAllPokemon(){
    const { deletedCount } = await this.pokemonModel.deleteMany({});
    if ( deletedCount === 0) {
      throw new BadRequestException(`Pokemon not found`);
    }
    return deletedCount;
  }


}
