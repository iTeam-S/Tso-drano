import { Controller, Get, NotAcceptableException, Param } from '@nestjs/common';
import { MembreService } from './membre.service';
import { MembreIdDto, MembreMailDto, MembrePrenomUsuelDto } from './dto/membre.dto';

@Controller('membre')
export class MembreController {
    constructor(
        private readonly membreService: MembreService
    ) {}

    @Get('all')
    findAllMembres() {
        return this.membreService.findAll();
    }

    @Get('id=:id')
    findByIdMembre(@Param() donnees: MembreIdDto) {
        if(!donnees.hasOwnProperty('id'))
            throw new NotAcceptableException('Credentials incorrects!');
        return this.membreService.findById(donnees);
    }

    @Get('prenom_usuel=:prenomUsuel')
    findByPrenomUsuelMembre(@Param() donnees: MembrePrenomUsuelDto) {
        if(!donnees.hasOwnProperty('prenomUsuel'))
            throw new NotAcceptableException('Credentials incorrects!');
        return this.membreService.findByPrenomUsuel(donnees);
    }

    @Get('mail=:mail')
    findByMailMembre(@Param() donnees: MembreMailDto) {
        if(!donnees.hasOwnProperty('mail'))
            throw new NotAcceptableException('Credentials incorrects!');
        return this.membreService.findByMail(donnees);
    }
}
