export interface IPlantcategory {
  id?: number;
  name?: string;
  description?: string | null;
  example?: string | null;
  moisture_max?: number | null;
  moisture_min?: number | null;
  light_max?: number | null;
  light_min?: number | null;
  humidity_max?: number | null;
  humidity_min?: number | null;
  temperature_max?: number | null;
  temperature_min?: number | null;
}

export class Plantcategory implements IPlantcategory {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string | null,
    public example?: string | null,
    public moisture_max?: number | null,
    public moisture_min?: number | null,
    public light_max?: number | null,
    public light_min?: number | null,
    public humidity_max?: number | null,
    public humidity_min?: number | null,
    public temperature_max?: number | null,
    public temperature_min?: number | null
  ) {}
}

export function getPlantcategoryIdentifier(plantcategory: IPlantcategory): number | undefined {
  return plantcategory.id;
}
