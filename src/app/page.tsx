"use client";

import { Button, InputField, Section, StatisticsSummary } from "@/components";
import { useSimulationResult as useSimulationResults } from "@/hooks/useSimulationResult";
import { CalculatorFormValues } from "@/types/calculator-form-values";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

const Home = () => {
  const [submittedFormValues, submitFormValues] =
    useState<CalculatorFormValues>();

  const { control, handleSubmit } = useForm<CalculatorFormValues>({
    // TODO: consider removing
    defaultValues: {
      weaponProfiles: [
        {
          attacks: { value: 2, isFixed: true },
          skill: 3,
          strength: 4,
          armourPenetration: 0,
          damage: 1,
          weaponsCount: 10,
        },
      ],
      defenderProfile: {
        toughness: 3,
        armourSave: 5,
        wounds: 1,
        modelsCount: 10,
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "weaponProfiles",
  });

  const { simulationResults } = useSimulationResults(submittedFormValues);

  const onAddWeaponProfileClick = () => {
    append({});
  };

  const onWeaponProfileRemoveClick = (index: number) => {
    remove(index);
  };

  const onSubmit = (data: CalculatorFormValues) => {
    submitFormValues(data);
  };

  return (
    <main className="p-8">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-8">
          <Section className="w-1/2" title="Weapon profiles">
            {fields.map((field, index) => (
              <div key={field.id}>
                <InputField
                  label="Attacks (A)"
                  control={control}
                  required
                  name={`weaponProfiles.${index}.attacks.value`}
                />
                <InputField
                  label="Ballistic Skill (BS)"
                  control={control}
                  required
                  name={`weaponProfiles.${index}.skill`}
                />
                <InputField
                  label="Strength (S)"
                  control={control}
                  required
                  name={`weaponProfiles.${index}.strength`}
                />
                <InputField
                  label="Armour Penetration (AP)"
                  control={control}
                  required
                  name={`weaponProfiles.${index}.armourPenetration`}
                />
                <InputField
                  label="Damage (D)"
                  control={control}
                  required
                  name={`weaponProfiles.${index}.damage`}
                />
                <InputField
                  label="Weapons' count"
                  control={control}
                  required
                  name={`weaponProfiles.${index}.weaponsCount`}
                />
                {index > 0 && (
                  <Button onClick={() => onWeaponProfileRemoveClick(index)}>
                    Remove weapon profile
                  </Button>
                )}
              </div>
            ))}
            <Button onClick={onAddWeaponProfileClick}>
              Add weapon profile
            </Button>
          </Section>
          <Section className="w-1/2" title="Defender profile">
            <InputField
              label="Toughness (T)"
              control={control}
              required
              name="defenderProfile.toughness"
            />
            <InputField
              label="Armour Save (SV)"
              control={control}
              required
              name="defenderProfile.armourSave"
            />
            <InputField
              label="Invulnerable Save"
              control={control}
              required
              name="defenderProfile.invulnerableSave"
            />
            <InputField
              label="Feel No Pain"
              control={control}
              required
              name="defenderProfile.feelNoPain"
            />
            <InputField
              label="Wounds (W)"
              control={control}
              required
              name="defenderProfile.wounds"
            />
            <InputField
              label="Models' count"
              control={control}
              required
              name="defenderProfile.modelsCount"
            />
          </Section>
        </div>
        <Button.Submit className="my-8" value="Run simulation" />
      </form>
      <StatisticsSummary results={simulationResults} />
    </main>
  );
};

export default Home;
