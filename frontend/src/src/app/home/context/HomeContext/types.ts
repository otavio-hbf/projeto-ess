import RequestStatus from "../../../../shared/types/request-status";
import TestModel from "../../models/TestModel";

/**
 * Represents the possible actions that can be dispatched to modify the home state.
 */
export type HomeStateAction =
  | {
      type: "CHANGE_CREATE_TEST_REQUEST_STATUS";
      payload: RequestStatus<any>;
    }
  | {
      type: "CHANGE_GET_TESTS_REQUEST_STATUS";
      payload: RequestStatus<TestModel[]>;
    };

/**
 * Represents the state of the home context.
 */
export interface HomeState {
  createTestRequestStatus: RequestStatus<any>;
  getTestsRequestStatus: RequestStatus<TestModel[]>;
}
