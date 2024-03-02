/**
 * Represents a TestModel object.
 */
export default class TestModel {
  /**
   * The ID of the TestModel.
   */
  id: string;

  /**
   * The name of the TestModel.
   */
  name: string;

  /**
   * Creates a new instance of the TestModel class.
   * @param data - The data to initialize the TestModel with.
   */
  constructor(data: TestModel) {
    this.id = data.id;
    this.name = data.name;
  }
}
