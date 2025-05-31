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

  constructor(id:String, periodoInicio:Date, periodoTermino:Date){
    super();

    this.id= id;

    this.periodoInicio= periodoInicio;

    this.periodoTermino= periodoTermino;

  }
}
export const ProcessSchema = SchemaFactory.createForClass(Process);