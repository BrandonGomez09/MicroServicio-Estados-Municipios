import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { StateEntity } from "./StateEntity";

@Entity('municipalities')
export class MunicipalityEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  state_id!: number;


  @ManyToOne(() => StateEntity, (state) => state.municipalities)
  @JoinColumn({ name: 'state_id' }) 
  state!: StateEntity;
}
