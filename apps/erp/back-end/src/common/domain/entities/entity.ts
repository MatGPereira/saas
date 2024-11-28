import { UniqueEntityId } from "./unique-entity-id";

abstract class Entity<T> {

	private _id: UniqueEntityId;
	protected props!: T

	protected constructor(props: T) {
		this._id = new UniqueEntityId();
		this.props = props;
	}

	public get id(): UniqueEntityId {
		return this._id;
	}
}

export { Entity };
