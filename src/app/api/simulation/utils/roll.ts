import { Dice } from "@/types";

export const roll = (dice: Dice) => Math.floor(Math.random() * dice + 1);
