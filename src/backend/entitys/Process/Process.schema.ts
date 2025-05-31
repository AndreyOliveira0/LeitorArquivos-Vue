// Importando os módulos necessários
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type ProcessDocument = HydratedDocument<Process>;


@Schema({ collection: 'Process' })
export class Process extends Document{
  @Prop({ type: Date, required: false, default: null})
  periodoInicio?: Date;

  @Prop({ type: Date, required: false, default: null})
  periodoTermino?: Date;

  @Prop({ type: Date})
  envioInicio: Date;

  @Prop({ type: Date, required: false, default: null})
  envioTermino?: Date;


  constructor(periodoInicio:Date, periodoTermino:Date, envioInicio:Date, envioTermino:Date){
    super();

    this.periodoInicio= periodoInicio;

    this.periodoTermino= periodoTermino;

    this.envioInicio= envioInicio;

    this.envioTermino= envioTermino;
  }
}
export const ProcessSchema = SchemaFactory.createForClass(Process);