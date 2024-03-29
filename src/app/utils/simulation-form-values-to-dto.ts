import { SimulationRequestDto } from "@/dtos/simulation-request-dto";
import { SimulationFormValues } from "@/types/simulation-form-values";

export const simulationFormValuesToDto = (
  formValues: SimulationFormValues,
): SimulationRequestDto | undefined => {
  try {
    return {
      weaponGroups: formValues.weaponGroups.map((weaponGroup) => ({
        // TODO: handle randomized attacks
        attacks: { isFixed: true, value: parseInt(weaponGroup.attacks!) },
        skill: parseInt(weaponGroup.skill!),
        strength: parseInt(weaponGroup.strength!),
        armourPenetration: parseInt(weaponGroup.armourPenetration!),
        damage: parseInt(weaponGroup.damage!),
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
  } catch {}
};
