// Importando os módulos necessários
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { HydratedDocument } from 'mongoose';

// Schema para a tabela "Bond"
export type BondDocument = HydratedDocument<Bond>;


@Schema({ collection: 'Bond' })
export class Bond extends Document{
  @Prop({ type: String})
  nome: String;

  @Prop({ type: String})
  matricula: String;

  @Prop({ type: String})
  turma: String;

  @Prop({ type: String})
  disciplina: String;

  @Prop({type:String})
  papel: String;

  @Prop({type:Date})
  inicio: Date;

  @Prop({type:Date})
  termino: Date;

  @Prop({type:Number})
  obs: Number;

  @Prop({type:String})
  status: String;

  @Prop({type:String})
  processId: String;

  constructor(nome: String, matricula: String, turma: String, disciplina: String, papel: String, inicio: Date, termino: Date, obs: Number, status: String, processId: String){
    super();

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
export const BondSchema = SchemaFactory.createForClass(Bond);