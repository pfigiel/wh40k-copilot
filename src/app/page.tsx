"use client";

import { SimulationRequestDto } from "./dtos/simulation-request-dto";
import { SimulationFormValues } from "./types/simulation-form-values";
import { simulationFormValuesToDto } from "./utils/simulation-form-values-to-dto";
import { Button, InputField, Section, StatisticsSummary } from "@/components";
import { useSimulationResult as useSimulationResults } from "@/hooks/useSimulationResult";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

const Home = () => {
  const [submittedFormValues, submitFormValues] =
    useState<SimulationRequestDto>();

  const { control, handleSubmit } = useForm<SimulationFormValues>({
    defaultValues: {
      weaponGroups: [{}],
      defenderGroups: [{}],
    },
  });

  const {
    fields: weaponGroups,
    append: appendWeaponGroup,
    remove: removeWeaponGroup,
  } = useFieldArray({
    control,
    name: "weaponGroups",
  });

  const {
    fields: defenderGroups,
    append: appendDefenderGroup,
    remove: removeDefenderGroup,
  } = useFieldArray({
    control,
    name: "defenderGroups",
  });

  const { simulationResults } = useSimulationResults(submittedFormValues);

  const onAddWeaponGroupClick = () => {
    appendWeaponGroup({});
  };

  const onRemoveWeaponGroupClick = (index: number) => {
    removeWeaponGroup(index);
  };

  const onAddDefenderGroupClick = () => {
    appendDefenderGroup({});
  };

  const onRemoveDefenderGroupClick = (index: number) => {
    removeDefenderGroup(index);
  };

  const onSubmit = (data: SimulationFormValues) => {
    submitFormValues(simulationFormValuesToDto(data));
  };

  return (
    <main className="p-8">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-8">
          <Section className="w-1/2" title="Weapon groups">
            {weaponGroups.map((weaponGroup, index) => (
              <div key={weaponGroup.id}>
                <InputField
                  label="Attacks (A)"
                  control={control}
                  required
                  name={`weaponGroups.${index}.attacks`}
                />
                <InputField
                  label="Ballistic Skill (BS)"
                  control={control}
                  required
                  name={`weaponGroups.${index}.skill`}
                />
                <InputField
                  label="Strength (S)"
                  control={control}
                  required
                  name={`weaponGroups.${index}.strength`}
                />
                <InputField
                  label="Armour Penetration (AP)"
                  control={control}
                  required
                  name={`weaponGroups.${index}.armourPenetration`}
                />
                <InputField
                  label="Damage (D)"
                  control={control}
                  required
                  name={`weaponGroups.${index}.damage`}
                />
                <InputField
                  label="Weapons' count"
                  control={control}
                  required
                  name={`weaponGroups.${index}.weaponsCount`}
                />
                {index > 0 && (
                  <Button onClick={() => onRemoveWeaponGroupClick(index)}>
                    Remove weapon group
                  </Button>
                )}
              </div>
            ))}
            <Button onClick={onAddWeaponGroupClick}>Add weapon group</Button>
          </Section>
          <Section className="w-1/2" title="Defender groups">
            {defenderGroups.map((defenderGroup, index) => (
              <div key={defenderGroup.id}>
                <InputField
                  label="Toughness (T)"
                  control={control}
                  required
                  name={`defenderGroups.${index}.toughness`}
                />
                <InputField
                  label="Armour Save (SV)"
                  control={control}
                  required
                  name={`defenderGroups.${index}.armourSave`}
                />
                <InputField
                  label="Invulnerable Save"
                  control={control}
                  required
                  name={`defenderGroups.${index}.invulnerableSave`}
                />
                <InputField
                  label="Feel No Pain"
                  control={control}
                  required
                  name={`defenderGroups.${index}.feelNoPain`}
                />
                <InputField
                  label="Wounds (W)"
                  control={control}
                  required
                  name={`defenderGroups.${index}.wounds`}
                />
                <InputField
                  label="Models' count"
                  control={control}
                  required
                  name={`defenderGroups.${index}.modelsCount`}
                />
                {index > 0 && (
                  <Button onClick={() => onRemoveDefenderGroupClick(index)}>
                    Remove defender group
                  </Button>
                )}
              </div>
            ))}
            <Button onClick={onAddDefenderGroupClick}>
              Add defender group
            </Button>
          </Section>
        </div>
        <Button.Submit className="my-8" value="Run simulation" />
      </form>
      <StatisticsSummary results={simulationResults} />
    </main>
  );
};

export default Home;
