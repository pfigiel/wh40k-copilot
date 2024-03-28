import { SimulationRequestDto } from "@/dtos/simulation-request-dto";
import { SimulationFormValues } from "@/types/simulation-form-values";

export const simulationFormValuesToDto = (
  formValues: SimulationFormValues,
): SimulationRequestDto | undefined => {
  try {
    return {
      weaponProfiles: formValues.weaponProfiles.map((weaponProfile) => ({
        // TODO: handle randomized attacks
        attacks: { isFixed: true, value: parseInt(weaponProfile.attacks!) },
        skill: parseInt(weaponProfile.skill!),
        strength: parseInt(weaponProfile.strength!),
        armourPenetration: parseInt(weaponProfile.armourPenetration!),
        damage: parseInt(weaponProfile.damage!),
        weaponsCount: parseInt(weaponProfile.weaponsCount!),
      })),
      defenderProfile: {
        toughness: parseInt(formValues.defenderProfile.toughness!),
        armourSave: parseInt(formValues.defenderProfile.armourSave!),
        invulnerableSave:
          formValues.defenderProfile.invulnerableSave !== undefined
            ? parseInt(formValues.defenderProfile.invulnerableSave!)
            : undefined,
        feelNoPain: formValues.defenderProfile.feelNoPain
          ? parseInt(formValues.defenderProfile.feelNoPain!)
          : undefined,
        wounds: parseInt(formValues.defenderProfile.wounds!),
        modelsCount: parseInt(formValues.defenderProfile.modelsCount!),
      },
    };
    // just return undefined upon error, as validation should be handled by the form
  } catch {}
};
