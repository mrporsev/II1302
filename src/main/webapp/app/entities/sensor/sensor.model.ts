import { IUser } from 'app/entities/user/user.model';

export interface ISensor {
  id?: number;
  humidity?: string | null;
  soilMoisture?: string | null;
  light?: string | null;
  name?: string | null;
  user?: IUser | null;
}

export class Sensor implements ISensor {
  constructor(
    public id?: number,
    public humidity?: string | null,
    public soilMoisture?: string | null,
    public light?: string | null,
    public name?: string | null,
    public user?: IUser | null
  ) {}
}

export function getSensorIdentifier(sensor: ISensor): number | undefined {
  return sensor.id;
}
