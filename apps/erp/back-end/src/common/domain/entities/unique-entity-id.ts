import { randomUUID } from 'node:crypto';

class UniqueEntityId {

	private value: string;

	public constructor(value?: string) {
		this.value = value ?? randomUUID();
	}

	public toString(): string {
		return this.value;
	}
}

export { UniqueEntityId };
