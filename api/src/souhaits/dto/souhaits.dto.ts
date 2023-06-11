import { ApiProperty } from "@nestjs/swagger";

export class CreateSouhaitDto {
    @ApiProperty()
    titre: string;

    @ApiProperty()
    description: string;
}

export class SouhaitUuidDto {
    @ApiProperty()
    uuid: string;
}

export class SouhaitMembreIdDto {
    @ApiProperty()
    membreId: number;
}

export class SouhaitMembrePrenomUsuelDto {
    @ApiProperty()
    prenomUsuel: string;
}

export class UpdateSouhait {
    @ApiProperty()
    uuid: string;

    @ApiProperty()
    titre: string;

    @ApiProperty()
    description: string;
}
