import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Membre } from 'src/entities';
import { Repository } from 'typeorm';
import { AuthDto, AuthResponse, AuthResponseToken } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Membre)
        private membreRepository: Repository<Membre>,
        private jwtService: JwtService
    ) {}

    private async signUserToken(donnees: AuthResponse): Promise<string> {
        return await this.jwtService.signAsync({
            id: donnees.id,
            prenomUsuel: donnees.prenomUsuel,
            mail: donnees.mail
        });
    }

    async authenticate({identifiant, password }: AuthDto): Promise<AuthResponseToken> {
        const response = await this.membreRepository
        .createQueryBuilder('m')
        .select([
            'm.id as id', 
            'm.prenom_usuel as prenomUsuel',
            'm.mail as mail',
        ])
        .where(`(m.prenom_usuel = :identifiant OR m.mail = :identifiant) 
            AND m.password = SHA2(:password, 256) AND m.actif = 1`, 
            { identifiant, password })
        .getRawOne() as AuthResponse;
        if(!response) throw new UnauthorizedException('Credentials incorrect!');
        return { access_token: await this.signUserToken(response as AuthResponse) };
    }
}
