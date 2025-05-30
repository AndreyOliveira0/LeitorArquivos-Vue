import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class BondEntity {
  @Column()
  nome: String;

  @PrimaryGeneratedColumn()
  matricula: String;

  @Column()
  turma: String;

  @Column()
  disciplina: String;

  @Column()
  papel: String;

  @Column()
  inicio: Date;

  @Column()
  termino: Date;

  @Column()
  obs: Number;

  @Column()
  status: String;

  @Column()
  processId: String;

   constructor(nome: String, matricula: String, turma: String, disciplina: String, papel: String, inicio: Date, termino: Date, obs: Number, status: String, processId: String){
    this.nome= nome;

    this.matricula= matricula;

    this.turma= turma;

    this.disciplina= disciplina;

    this.papel= papel;

    this.inicio= inicio;

    this.termino= termino;

    this.obs= obs;

    this.status= status;

    this.processId= processId;
  }
}
