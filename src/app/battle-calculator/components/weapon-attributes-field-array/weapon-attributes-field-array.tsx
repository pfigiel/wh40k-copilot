import { SimulationFormValues } from "@/battle-calculator/types";
import { weaponAttributeHasValue } from "@/battle-calculator/utils";
import { Button, DropdownField, InputField, Section } from "@/components";
import { WeaponAttributeType } from "@/types";
import { range, ssCaseToSpacedPascalCase } from "@/utils";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEvent, useMemo, useState } from "react";
import { Control, useFieldArray } from "react-hook-form";

interface Props {
  control: Control<SimulationFormValues>;
  parentIndex: number;
}

export const WeaponAttributesFieldArray = ({ control, parentIndex }: Props) => {
  const [shouldRenderValueFieldMap, setShouldRenderValueFieldMap] = useState<{
    [key: number]: boolean;
  }>({});

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
    event.preventDefault(); // prevent form from being submitted by the click
    append({});
  };

  const onRemoveWeaponAttributeClick = (index: number) => {
    const newShouldRenderValueFieldMap = { ...shouldRenderValueFieldMap };
    newShouldRenderValueFieldMap[index] = false;
    setShouldRenderValueFieldMap(newShouldRenderValueFieldMap);
    remove(index);
  };

  const onSelect = (attributeType: WeaponAttributeType, index: number) => {
    const newShouldRenderValueFieldMap = { ...shouldRenderValueFieldMap };
    newShouldRenderValueFieldMap[index] =
      weaponAttributeHasValue(attributeType);
    setShouldRenderValueFieldMap(newShouldRenderValueFieldMap);
  };

  return (
    <Section className="my-5 px-2 pb-2 pt-3" title="Attributes" level={3}>
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2">
          <DropdownField
            className="w-16 flex-auto"
            control={control}
            label="Attribute name"
            name={`weaponGroups.${parentIndex}.attributes.${index}.type`}
            options={attributeOptions}
            renderFocused
            onSelect={(value) => onSelect(value, index)}
          />
          {shouldRenderValueFieldMap[index] && (
            <InputField
              className="w-4 flex-auto"
              control={control}
              name={`weaponGroups.${parentIndex}.attributes.${index}.value`}
              label="Value"
            />
          )}
          <button onClick={() => onRemoveWeaponAttributeClick(index)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ))}
      <Button onClick={onAddWeaponAttributeClick}>Add Weapon Attribute</Button>
    </Section>
  );
};
