import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ClassEntity {

  @Column()
  turma: String;

  @PrimaryGeneratedColumn()
  codigo: String;

  @Column()
  disciplina: String;

  @Column()
  turno: String;

  @Column()
  capacidade: Number;

  @Column()
  inicio: Date;

  @Column()
  termino: Date;

  @Column()
  professor: String;

  @Column()
  status: String;

  @Column()
  processId: String;

  constructor( turma: String, codigo: String, disciplina: String, turno: String, capacidade: Number, inicio: Date, termino: Date, professor: String, status: String, processId: String){
    this.turma= turma;

    this.codigo= codigo;

    this.disciplina= disciplina;

    this.turno= turno;

    this.capacidade= capacidade;

    this.inicio= inicio;

    this.termino= termino;

    this.professor= professor;

    this.status= status;

    this.processId= processId;
  }
}
