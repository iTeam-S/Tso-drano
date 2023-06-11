import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { Membre } from 'src/entities';
import { Repository } from 'typeorm';
import { MembreIdDto, MembreMailDto, MembrePrenomUsuelDto } from './dto/membre.dto';

@Injectable()
export class MembreService {
    constructor(
        @InjectRepository(Membre)
        private membreRepository: Repository<Membre>
    ) {}

    findAll(): Observable<Membre[]> {
        return from(
            this.membreRepository
            .createQueryBuilder('m')
            .select([
                'm.id as id', 'm.nom as nom', 'm.prenom as prenoms',
                'm.prenom_usuel as prenomUsuel', 'm.user_github_pic as user_github_pic',
                'm.tel1 as tel1', 'm.tel2 as tel2', 'm. mail as  mail', 
                'm.date_d_adhesion as date_adhesion', 'm.facebook as facebook',
                'm.linkedin as linkedin', 'm.cv as cv', 'm.adresse as adresse',
                'm.description as description', 'm.fonction as fonction',
                'm.pdc as pdc'
            ])
            .where(`m.actif = 1`)
            .getRawMany()
        );
    }

    findById({ id }: MembreIdDto): Observable<Membre> {
        return from(
            this.membreRepository
            .createQueryBuilder('m')
            .select([
                'm.id as id', 'm.nom as nom', 'm.prenom as prenoms',
                'm.prenom_usuel as prenomUsuel', 'm.user_github_pic as user_github_pic',
                'm.tel1 as tel1', 'm.tel2 as tel2', 'm. mail as  mail', 
                'm.date_d_adhesion as date_adhesion', 'm.facebook as facebook',
                'm.linkedin as linkedin', 'm.cv as cv', 'm.adresse as adresse',
                'm.description as description', 'm.fonction as fonction',
                'm.pdc as pdc'
            ])
            .where(`m.actif = 1 AND m.id = :id`, { id })
            .getRawOne()
        );
    }

    findByPrenomUsuel({ prenomUsuel }: MembrePrenomUsuelDto): Observable<Membre> {
        return from(
            this.membreRepository
            .createQueryBuilder('m')
            .select([
                'm.id as id', 'm.nom as nom', 'm.prenom as prenoms',
                'm.prenom_usuel as prenomUsuel', 'm.user_github_pic as user_github_pic',
                'm.tel1 as tel1', 'm.tel2 as tel2', 'm. mail as  mail', 
                'm.date_d_adhesion as date_adhesion', 'm.facebook as facebook',
                'm.linkedin as linkedin', 'm.cv as cv', 'm.adresse as adresse',
                'm.description as description', 'm.fonction as fonction',
                'm.pdc as pdc'
            ])
            .where(`m.actif = 1 AND m.prenom_usuel = :prenomUsuel`, { prenomUsuel })
            .getRawOne()
        );
    }

    findByMail({ mail }: MembreMailDto): Observable<Membre> {
        return from(
            this.membreRepository
            .createQueryBuilder('m')
            .select([
                'm.id as id', 'm.nom as nom', 'm.prenom as prenoms',
                'm.prenom_usuel as prenomUsuel', 'm.user_github_pic as user_github_pic',
                'm.tel1 as tel1', 'm.tel2 as tel2', 'm. mail as  mail', 
                'm.date_d_adhesion as date_adhesion', 'm.facebook as facebook',
                'm.linkedin as linkedin', 'm.cv as cv', 'm.adresse as adresse',
                'm.description as description', 'm.fonction as fonction',
                'm.pdc as pdc'
            ])
            .where(`m.actif = 1 AND m.mail = :mail`, { mail })
            .getRawOne()
        );
    }
}
