import { DefenderEntity } from "./defender-entity";
import { DefenderGroup } from "@/types";

export class DefenderGroupEntity
  extends DefenderEntity
  implements DefenderGroup
{
  public modelsCount: number = 1;

  public constructor(
    initializer: Partial<Omit<DefenderGroupEntity, "woundsRemaining">>,
  ) {
    const { modelsCount, ...rest } = initializer ?? {};
    super(rest);
    this.modelsCount = modelsCount ?? 0;
  }
}
