// Importando os módulos necessários
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type ProcessDocument = HydratedDocument<Process>;


@Schema({ collection: 'Process' })
export class Process extends Document{
  @Prop({type:String})
  id: String;

  @Prop({ type: Date})
  periodoInicio: Date;

  @Prop({ type: Date})
  periodoTermino: Date;

  @Prop({ type: Date})
  envioInicio: Date;

  @Prop({ type: Date})
  envioTermino: Date;


  constructor(id:String, periodoInicio:Date, periodoTermino:Date, envioInicio:Date, envioTermino:Date){
    super();

    this.id= id;

    this.periodoInicio= periodoInicio;

    this.periodoTermino= periodoTermino;

    this.envioInicio= envioInicio;

    this.envioTermino= envioTermino;
  }
}
export const ProcessSchema = SchemaFactory.createForClass(Process);