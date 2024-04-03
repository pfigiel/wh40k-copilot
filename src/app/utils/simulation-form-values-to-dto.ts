import { FixedOrRandomizedProperty } from "../types/fixed-or-randomized-property";
import { SimulationRequestDto } from "@/dtos/simulation-request-dto";
import { SimulationFormValues } from "@/types/simulation-form-values";

const positiveIntegerRegex = "[1-9][0-9]*";

const parseFixedOrRandomizedProperty = (
  rawInputValue: string,
): FixedOrRandomizedProperty => {
  const parsedNumericValue = parseInt(rawInputValue);

  if (!Number.isNaN(parsedNumericValue)) {
    return { isFixed: true, value: parsedNumericValue };
  }

  const randomizedValueRegex = new RegExp(
    `(${positiveIntegerRegex})?d([36])(\\+(${positiveIntegerRegex})+)?`,
  );

  const [, rawDiceCount, rawDice, , rawValue] = randomizedValueRegex.exec(
    rawInputValue,
  ) as RegExpExecArray;

  const diceCount = rawDiceCount ? parseInt(rawDice) : 1;
  const dice = parseInt(rawDice);
  const value = rawValue ? parseInt(rawValue) : 0;

  return {
    isFixed: false,
    diceCount,
    dice,
    value,
  };
};

export const simulationFormValuesToDto = (
  formValues: SimulationFormValues,
): SimulationRequestDto | undefined => {
  try {
    return {
      weaponGroups: formValues.weaponGroups.map((weaponGroup) => ({
        attacks: parseFixedOrRandomizedProperty(weaponGroup.attacks!),
        skill: parseInt(weaponGroup.skill!),
        strength: parseInt(weaponGroup.strength!),
        armourPenetration: parseInt(weaponGroup.armourPenetration!),
        damage: parseFixedOrRandomizedProperty(weaponGroup.damage!),
        weaponsCount: parseInt(weaponGroup.weaponsCount!),
      })),
      defenderGroups: formValues.defenderGroups.map((defenderGroup) => ({
        toughness: parseInt(defenderGroup.toughness!),
        armourSave: parseInt(defenderGroup.armourSave!),
        invulnerableSave:
          defenderGroup.invulnerableSave !== undefined
            ? parseInt(defenderGroup.invulnerableSave!)
            : undefined,
        feelNoPain: defenderGroup.feelNoPain
          ? parseInt(defenderGroup.feelNoPain!)
          : undefined,
        wounds: parseInt(defenderGroup.wounds!),
        modelsCount: parseInt(defenderGroup.modelsCount!),
      })),
    };
    // just return undefined upon error, as validation should be handled by the form
  } catch (error) {}
};
