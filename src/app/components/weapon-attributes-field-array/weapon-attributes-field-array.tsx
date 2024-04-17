import { SimulationFormValues } from "@/app/types/simulation-form-values";
import { Button, DropdownField, InputField } from "@/components";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEvent } from "react";
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

  const onAddWeaponAttributeClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // prevent form from being submitted due to click
    append({});
  };

  const onRemoveWeaponAttributeClick = (index: number) => {
    remove(index);
  };

  return (
    <>
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2">
          <DropdownField
            className="w-16 flex-auto"
            control={control}
            label="Attribute name"
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
            className="w-4 flex-auto"
            control={control}
            name={`weaponGroups.${parentIndex}.attributes.${index}.value`}
            label="Value"
          />
          <button onClick={() => onRemoveWeaponAttributeClick(index)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ))}
      <Button onClick={onAddWeaponAttributeClick}>Add Weapon Attribute</Button>
    </>
  );
};
