import { Dice } from "@/types/dice";

export const roll = (dice: Dice) => Math.floor(Math.random() * dice + 1);
