import { ApiProperty } from "@nestjs/swagger";

export class AuthDto {
    @ApiProperty()
    identifiant: string;

    @ApiProperty()
    password: string;
}

export class AuthResponseToken {
    access_token: string;
}

export class AuthResponse {
    id: number;
    prenomUsuel: string;
    mail: string;
}