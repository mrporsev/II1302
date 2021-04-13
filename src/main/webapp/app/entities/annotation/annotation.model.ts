import * as dayjs from 'dayjs';
import { ISensor } from 'app/entities/sensor/sensor.model';

export interface IAnnotation {
  id?: number;
  smiley?: string;
  textBox?: string;
  date?: dayjs.Dayjs;
  sensor?: ISensor | null;
}

export class Annotation implements IAnnotation {
  constructor(
    public id?: number,
    public smiley?: string,
    public textBox?: string,
    public date?: dayjs.Dayjs,
    public sensor?: ISensor | null
  ) {}
}

export function getAnnotationIdentifier(annotation: IAnnotation): number | undefined {
  return annotation.id;
}
