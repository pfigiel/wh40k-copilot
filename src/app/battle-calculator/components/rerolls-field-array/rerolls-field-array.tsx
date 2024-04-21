import { SimulationFormValues } from "@/battle-calculator/types";
import { Button, DropdownField, Section } from "@/components";
import { WeaponRerollApplication, RerollType } from "@/types";
import { range, ssCaseToSpacedPascalCase } from "@/utils";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEvent, useMemo } from "react";
import { Control, useFieldArray } from "react-hook-form";

interface Props {
  control: Control<SimulationFormValues>;
  parentIndex: number;
}

export const RerollFieldsArray = ({ control, parentIndex }: Props) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `weaponGroups.${parentIndex}.rerolls`,
  });

  const applicationOptions = useMemo(() => {
    return [
      { value: WeaponRerollApplication.HITS, display: "Hits" },
      { value: WeaponRerollApplication.WOUNDS, display: "Wounds" },
    ];
  }, []);

  const typeOptions = useMemo(() => {
    const typeValuesAndKeys = Object.keys(RerollType);
    const typesCount = typeValuesAndKeys.length / 2;
    const typesValues = typeValuesAndKeys.slice(0, typesCount);
    const typesKeys = typeValuesAndKeys.slice(typesCount);

    return range(typesCount).map((_, index) => ({
      value: parseInt(typesValues[index]),
      display: ssCaseToSpacedPascalCase(typesKeys[index]),
    }));
  }, []);

  const onAddWeaponAttributeClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // prevent form from being submitted by the click
    append({});
  };

  const onRemoveWeaponAttributeClick = (index: number) => {
    remove(index);
  };

  return (
    <Section className="my-5 px-2 pb-2 pt-3" title="Rerolls" level={3}>
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2">
          <DropdownField
            className="w-16 flex-auto"
            control={control}
            label="Applies to"
            name={`weaponGroups.${parentIndex}.rerolls.${index}.application`}
            options={applicationOptions}
            renderFocused
          />
          <DropdownField
            className="w-16 flex-auto"
            control={control}
            label="Type"
            name={`weaponGroups.${parentIndex}.rerolls.${index}.type`}
            options={typeOptions}
          />
          <button onClick={() => onRemoveWeaponAttributeClick(index)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ))}
      <Button onClick={onAddWeaponAttributeClick}>Add Reroll</Button>
    </Section>
  );
};
