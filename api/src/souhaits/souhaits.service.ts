import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { Souhaits } from 'src/entities/Souhaits';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { CreateSouhaitDto, SouhaitMembreIdDto, 
    SouhaitMembrePrenomUsuelDto, SouhaitUuidDto, UpdateSouhait} from './dto/souhaits.dto';
import { Membre } from 'src/entities';
import { randomUUID } from 'node:crypto';

@Injectable()
export class SouhaitsService {
    constructor(
        @InjectRepository(Souhaits)
        private souhaitsRepository: Repository<Souhaits> 
    ) {}

    create({ titre, description }: CreateSouhaitDto, membreId: number): Observable<InsertResult> {
        return from(this.souhaitsRepository
            .createQueryBuilder()
            .insert()
            .into(Souhaits)
            .values({
                uuid: randomUUID(),
                titre,
                description,
                membreId
            })
            .execute()
        );
    }

    findAll(): Observable<Souhaits[]> {
        return from(
            this.souhaitsRepository
            .createQueryBuilder('s')
            .select([
                's.id as id', 's.titre as titre', 's.uuid as uuid',
                's.description as description', 's.membre_id as membreId', 
                'm.prenom_usuel as prenomUsuel'
            ])
            .innerJoin(Membre, 'm', 'm.id = s.membre_id')
            .orderBy('s.id', "DESC")
            .getRawMany()
        );
    }

    findByUuid({ uuid }: SouhaitUuidDto): Observable<Souhaits> {
        return from(
            this.souhaitsRepository
            .createQueryBuilder('s')
            .select([
                's.id as id', 's.titre as titre', 's.uuid as uuid',
                's.description as description', 's.membre_id as membreId', 
                'm.prenom_usuel as prenomUsuel'
            ])
            .innerJoin(Membre, 'm', 'm.id = s.membre_id')
            .where(`s.uuid = :uuid`, { uuid })
            .orderBy('s.id', "DESC")
            .getRawOne()
        );
    }

    findByMembreId({ membreId }: SouhaitMembreIdDto): Observable<Souhaits[]> {
        return from(
            this.souhaitsRepository
            .createQueryBuilder('s')
            .select([
                's.id as id', 's.titre as titre', 's.uuid as uuid',
                's.description as description', 's.membre_id as membreId', 
                'm.prenom_usuel as prenomUsuel'
            ])
            .innerJoin(Membre, 'm', 'm.id = s.membre_id')
            .where(`s.membre_id = :membreId`, { membreId })
            .orderBy('s.id', "DESC")
            .getRawMany()
        );
    }

    findByMembrePrenomUsuel({ prenomUsuel }: SouhaitMembrePrenomUsuelDto): Observable<Membre[]> {
        return from(
            this.souhaitsRepository
            .createQueryBuilder('s')
            .select([
                's.id as id', 's.titre as titre', 's.uuid as uuid',
                's.description as description', 's.membre_id as membreId', 
                'm.prenom_usuel as prenomUsuel'
            ])
            .innerJoin(Membre, 'm', 'm.id = s.membre_id')
            .where(`m.prenom_usuel = :prenomUsuel`, { prenomUsuel })
            .orderBy('s.id', "DESC")
            .getRawMany()
        );
    }

    update({ uuid, titre, description }: UpdateSouhait): Observable<UpdateResult> {
        return from(this.souhaitsRepository
            .createQueryBuilder()
            .update(Souhaits)
            .set({
                titre,
                description,
                updatedAt: () => "CURRENT_TIMESTAMP"
            })
            .where(`uuid = :uuid`, { uuid })
            .execute()
        );
    }

    delete({ uuid }: SouhaitUuidDto): Observable<DeleteResult> {
        return from(
            this.souhaitsRepository
            .createQueryBuilder()
            .delete()
            .from(Souhaits)
            .where(`uuid = :uuid`, { uuid })
            .execute()
        );
    }
}
