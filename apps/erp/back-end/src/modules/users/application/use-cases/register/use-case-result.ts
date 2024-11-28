import { UniqueEntityId } from "@/common/domain/entities/unique-entity-id";

interface IRegisterUserUseCaseResult {
  createdUserId: UniqueEntityId;
}

export type { IRegisterUserUseCaseResult };
