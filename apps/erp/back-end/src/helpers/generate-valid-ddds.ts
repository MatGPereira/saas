import { EBrazilDdd } from "@/modules/users/domain/value-objects/validators/telephone-validator-constants";

function generateValidDdds(): string[] {
  return Object.keys(EBrazilDdd).filter(ddd => +ddd);
}

export { generateValidDdds };
