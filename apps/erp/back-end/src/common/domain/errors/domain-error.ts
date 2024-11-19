class DomainError {

  public constructor(
    private _errorMessage: string
  ) { }

  public get errorMessage(): string {
    return this._errorMessage;
  }
}

export { DomainError };
