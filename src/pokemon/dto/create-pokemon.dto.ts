import { IsInt, IsNumber, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreatePokemonDto {

    @IsNumber()
    @IsInt()
    @Min(1)
    @IsPositive()
    no: number;

    @MinLength(1)
    @IsString()
    name:string


}
