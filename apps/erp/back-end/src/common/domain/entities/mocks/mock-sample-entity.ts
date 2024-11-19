import { Entity } from "../entity";
import { UniqueEntityId } from "../unique-entity-id";

class MockSampleEntity extends Entity<string> {

  public getId(): UniqueEntityId {
    return super.id;
  }

  public static create(props: string): MockSampleEntity {
    return new MockSampleEntity(props);
  }
}

export { MockSampleEntity };
