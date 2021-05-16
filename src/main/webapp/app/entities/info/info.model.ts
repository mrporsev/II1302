export interface IInfo {
  id?: number;
}

export class Info implements IInfo {
  constructor(public id?: number) {}
}

export function getInfoIdentifier(info: IInfo): number | undefined {
  return info.id;
}
