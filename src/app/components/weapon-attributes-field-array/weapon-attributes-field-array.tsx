import { SimulationFormValues } from "@/app/types/simulation-form-values";
import { Button, DropdownField, InputField } from "@/components";
import { Fragment } from "react";
import { Control, useFieldArray } from "react-hook-form";

interface Props {
  control: Control<SimulationFormValues>;
  parentIndex: number;
}

export const WeaponAttributesFieldArray = ({ control, parentIndex }: Props) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `weaponGroups.${parentIndex}.attributes`,
  });

  const onAddWeaponAttributeClick = () => {
    append({});
  };

  const onRemoveWeaponAttributeClick = (index: number) => {
    remove(index);
  };

  return (
    <>
      {fields.map((field, index) => (
        <Fragment key={field.id}>
          <DropdownField
            control={control}
            name={`weaponGroups.${parentIndex}.attributes.${index}.type`}
            options={[
              { value: "BLAST", display: "Blast" },
              {
                value: "DEVASTATING_WOUNDS",
                display: "Devastating Wounds",
              },
              { value: "LETHAL_HITS", display: "Lethal Hits" },
              { value: "SUSTAINED_HITS", display: "Sustained Hits" },
              { value: "TWIN_LINKED", display: "Twin Linked" },
            ]}
          />
          <InputField
            control={control}
            name={`weaponGroups.${parentIndex}.attributes.${index}.value`}
          />
          <Button onClick={() => onRemoveWeaponAttributeClick(index)}>
            Remove Weapon Attribute
          </Button>
        </Fragment>
      ))}
      <Button onClick={onAddWeaponAttributeClick}>Add Weapon Attribute</Button>
    </>
  );
};
