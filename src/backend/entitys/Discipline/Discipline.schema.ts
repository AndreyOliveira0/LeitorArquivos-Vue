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

  @Prop({ type: String})
  codigo: String;

  @Prop({ type: Date})
  inicio: Date;

  @Prop({ type: Date})
  termino: Date;

  @Prop({ type: String })
  categoria: String;

  @Prop({ type: Number})
  periodoCurricular: Number;

  @Prop({ type: String})
  estado: String;

  @Prop({ type: String })
  campus: String;

  @Prop({ type: String })
  processId: String;

  constructor(periodo: String, disciplina: String, codigo: String, inicio: Date, termino: Date, categoria: String, periodoCurricular: Number, estado: String, campus: String, processId: String){
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

    this.processId= processId;
  }
}
export const DisciplineSchema = SchemaFactory.createForClass(Discipline);