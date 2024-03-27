"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { CalculatorFormValues } from "./types/calculator-form-values";
import { H1 } from "./components/h1/h1";
import { InputField } from "./components/input-field/input-field";
import { Button } from "./components/button/button";

const Home = () => {
  const { control, handleSubmit } = useForm<CalculatorFormValues>({
    defaultValues: {
      weaponProfiles: [{}],
      defenderProfile: {},
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "weaponProfiles",
  });

  const onAddWeaponProfileClick = () => {
    append({
      attacks: "",
      skill: "",
      strength: "",
      armourPenetration: "",
      damage: "",
      weaponsCount: "",
    });
  };

  // TODO: handle submit
  const onSubmit = (data: CalculatorFormValues) => {};

  return (
    <main className={"flex"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className={"w-1/2"}>
          <H1>Weapon profiles</H1>
          {fields.map((field, index) => (
            <div key={field.id}>
              <InputField
                label="Attacks (A)"
                control={control}
                required
                name={`weaponProfiles.${index}.attacks`}
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
            </div>
          ))}
          <Button onClick={onAddWeaponProfileClick}>Add weapon profile</Button>
        </section>
        <section>
          <H1>Defender profile</H1>
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
            name="defenderProfile.toughness"
          />
          <InputField
            label="Models' count"
            control={control}
            required
            name="defenderProfile.modelsCount"
          />
        </section>
        <Button.Submit value="Run simulation" />
      </form>
    </main>
  );
};

export default Home;
