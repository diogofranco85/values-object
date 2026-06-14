export abstract class ValueObject<T> {
  protected readonly props: T;

  constructor(props: T) {
    this.props = Object.freeze(props);
  }

  public equals(valueObject?: ValueObject<T>): boolean {
    if (!valueObject) return false;

    return JSON.stringify(this.props) === JSON.stringify(valueObject.props);
  }
}