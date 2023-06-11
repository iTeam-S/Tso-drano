import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Membre } from "./Membre";


@Index("fk_membre_id_souhaits", ["membreId"], {})
@Entity("souhaits", { schema: "TSODRANO" })
export class Souhaits {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "uuid", length: 255 })
  uuid: string;

  @Column("varchar", { name: "titre", length: 255 })
  titre: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("int", { name: "membre_id" })
  membreId: number;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => Membre, (membre) => membre.souhaits, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "membre_id", referencedColumnName: "id" }])
  membre: Membre;
}
