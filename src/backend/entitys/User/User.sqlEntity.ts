import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserEntity {
  @Column()
  nome: String;

  @PrimaryGeneratedColumn()
  matricula: String;

  @Column()
  email: String;

  @Column()
  curso: String;

  @Column()
  tipo: String;

  @Column()
  nascimento: Date;

  @Column()
  cadastro: Date;

  @Column()
  contato: String;

  @Column()
  status: String;

  @Column()
  processId: String;

  constructor(nome: String, matricula: String, email: String, curso: String, tipo: String, nascimento: Date, cadastro: Date, contato: String, status: String, processId: String){
    this.nome= nome;

    this.matricula= matricula;

    this.email= email;

    this.curso= curso;

    this.tipo= tipo;

    this.nascimento= nascimento;

    this.cadastro= cadastro;

    this.contato= contato;

    this.status= status; 

    this.processId= processId;
  }
}
