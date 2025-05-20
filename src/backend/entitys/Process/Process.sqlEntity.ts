import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ProcessEntity {
  @PrimaryGeneratedColumn()
  id: String;

  @Column()
  periodoInicio: String;

  @Column()
  periodoTermino: String;

  @Column()
  inicio: Date;

  @Column()
  termino: Date;

  constructor(periodoInicio:String, periodoTermino:String, inicio:Date, termino:Date, id:String){
    this.id= id;

    this.periodoInicio= periodoInicio;

    this.periodoTermino= periodoTermino;

    this.inicio= inicio;

    this.termino= termino;
  }
}
