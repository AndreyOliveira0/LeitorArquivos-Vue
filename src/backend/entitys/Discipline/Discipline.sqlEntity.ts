import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class DisciplineEntity {
  @Column()
  periodo: String;

  @Column()
  disciplina: String;

  @PrimaryGeneratedColumn()
  codigo: String;

  @Column()
  inicio: Date;

  @Column()
  termino: Date;

  @Column()
  categoria: string;

  @Column()
  periodoCurricular: Number;

  @Column()
  estado: String;

  @Column()
  campus: string;

  @Column()
  processId: String;

  constructor(periodo: String, disciplina: String, codigo: String, inicio: Date, termino: Date, categoria: string, periodoCurricular: Number, estado: String, campus: string, processId: String){
    this.periodo= periodo;

    this.disciplina= disciplina;

    this.codigo= codigo;

    this.inicio= inicio;

    this.termino= termino;

    this.categoria= categoria;

    this.periodoCurricular= periodoCurricular;

    this.estado= estado;

    this.campus= campus;

    this.processId= processId;
  }
}
