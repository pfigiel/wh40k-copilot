import { RerollType } from "./reroll";

export interface Defender {
  toughness: number;
  armourSave: number;
  invulnerableSave?: number;
  feelNoPain?: number;
  wounds: number;
  saveRerollType?: RerollType;
}
