/**
 * Represents the base response model for API responses.
 */
export default class BaseApiResponseModel {
  msg: string;
  msgCode: string;
  code: number;
  data?: any;

  /**
   * Creates an instance of BaseApiResponseModel.
   * @param {BaseApiResponseModel} data - The data to initialize the model with.
   */
  constructor(data: BaseApiResponseModel) {
    this.msg = data.msg;
    this.msgCode = data.msgCode;
    this.code = data.code;
    this.data = data.data;
  }
}
