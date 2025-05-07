// Importando os módulos necessários
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { HydratedDocument } from 'mongoose';

// Schema para a tabela "disciplines"
export type DisciplineDocument = HydratedDocument<Discipline>;


@Schema({collection: 'Discipline' })
export class Discipline extends Document{
  @Prop({ type: String})
  periodo: String;

  @Prop({ type: String})
  disciplina: String;

  @Prop({ type: Number})
  codigo: number;

  @Prop({ type: Date})
  inicio: Date;

  @Prop({ type: Date})
  termino: Date;

  @Prop({ type: String })
  categoria: string;

  @Prop({ type: Number})
  periodoCurricular: Number;

  @Prop({ type: String})
  estado: String;

  @Prop({ type: String })
  campus: string;

  @Prop({type:String})
  status: String;

  constructor(periodo: String, disciplina: String, codigo: number, inicio: Date, termino: Date, categoria: string, periodoCurricular: Number, estado: String, campus: string, status: String){
    super();

    this.periodo= periodo;

    this.disciplina= disciplina;

    this.codigo= codigo;

    this.inicio= inicio;

    this.termino= termino;

    this.categoria= categoria;

    this.periodoCurricular= periodoCurricular;

    this.estado= estado;

    this.campus= campus;

    this.status= status;
  }
}
export const DisciplineSchema = SchemaFactory.createForClass(Discipline);