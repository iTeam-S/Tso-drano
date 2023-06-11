import { Body, Controller, Delete, Get, NotAcceptableException, Param, 
    Post, Put, Request, UseGuards } from '@nestjs/common';
import { SouhaitsService } from './souhaits.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateSouhaitDto, SouhaitMembreIdDto, SouhaitMembrePrenomUsuelDto, 
    SouhaitUuidDto, UpdateSouhait } from './dto/souhaits.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('souhaits')
export class SouhaitsController {
    constructor(
        private readonly souhaitsService: SouhaitsService
    ) {}

    @UseGuards(AuthGuard('jwtTsodrano'))
    @Post('/create')
    createSouhaite(@Body() donnees: CreateSouhaitDto, @Request() { user }: any) {
        if(!donnees.hasOwnProperty('titre') || !donnees.hasOwnProperty('description'))
            throw new NotAcceptableException('Credentials incorrects!');
        return this.souhaitsService.create(donnees, user.id);
    }

    @UseGuards(AuthGuard('jwtTsodrano'))
    @Get('all')
    findAllSouhaits() {
        return this.souhaitsService.findAll();
    }

    @UseGuards(AuthGuard('jwtTsodrano'))
    @Get('uuid=:uuid')
    findByUuidSouhait(@Param() donnees: SouhaitUuidDto) {
        if(!donnees.hasOwnProperty('uuid'))
            throw new NotAcceptableException('Credentials incorrects!');
        return this.souhaitsService.findByUuid(donnees);
    }

    @Get('membre-id=:membreId')
    findByMembreIdSouhaits(@Param() donnees: SouhaitMembreIdDto) {
        if(!donnees.hasOwnProperty('membreId'))
            throw new NotAcceptableException('Credentials incorrects!');
        return this.souhaitsService.findByMembreId(donnees);
    }

    @Get('prenom-usuel=:prenomUsuel')
    findByMembrePrenomUsuelSouhaits(@Param() donnees: SouhaitMembrePrenomUsuelDto) {
        if(!donnees.hasOwnProperty('prenomUsuel'))
            throw new NotAcceptableException('Credentials incorrects!');
        return this.souhaitsService.findByMembrePrenomUsuel(donnees);
    }

    @UseGuards(AuthGuard('jwtTsodrano'))
    @Put('update')
    updateSouhait(@Body() donnees: UpdateSouhait) {
        if(!donnees.hasOwnProperty('uuid') || 
        !donnees.hasOwnProperty('titre') || 
        !donnees.hasOwnProperty('description'))
            throw new NotAcceptableException('Credentials incorrects!');
        return this.souhaitsService.update(donnees);
    }

    @UseGuards(AuthGuard('jwtTsodrano'))
    @Delete('delete/:uuid')
    deleteSouhait(@Param() donnees: SouhaitUuidDto) {
        if(!donnees.hasOwnProperty('uuid'))
            throw new NotAcceptableException('Credentials incorrects!');
        return this.souhaitsService.delete(donnees);
    }
}
