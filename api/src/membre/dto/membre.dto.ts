import { ApiProperty } from "@nestjs/swagger";

export class MembreIdDto {
    @ApiProperty()
    id: number;
}

export class MembrePrenomUsuelDto {
    @ApiProperty()
    prenomUsuel: string;
}

export class MembreMailDto {
    @ApiProperty()
    mail: string;
}