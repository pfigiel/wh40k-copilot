import { ssCaseToSpacedPascalCase } from "@/app/utils/ss-case-to-spaced-pascal-case";
import { Button, DropdownField, InputField } from "@/components";
import { SimulationFormValues } from "@/types/simulation-form-values";
import { WeaponAttributeType } from "@/types/weapon-attribute";
import { range } from "@/utils/range";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEvent, useMemo } from "react";
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

  const attributeOptions = useMemo(() => {
    const attributeValuesAndKeys = Object.keys(WeaponAttributeType);
    const attributesCount = attributeValuesAndKeys.length / 2;
    const attributeValues = attributeValuesAndKeys.slice(0, attributesCount);
    const attributeKeys = attributeValuesAndKeys.slice(attributesCount);

    return range(attributesCount).map((_, index) => ({
      value: parseInt(attributeValues[index]),
      display: ssCaseToSpacedPascalCase(attributeKeys[index]),
    }));
  }, []);

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
            options={attributeOptions}
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
