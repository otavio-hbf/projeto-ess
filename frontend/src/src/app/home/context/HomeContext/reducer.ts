import { HomeState, HomeStateAction } from "./types";

/**
 * Reducer function for the HomeState context.
 * @param state - The current state of the HomeState context.
 * @param action - The action object that describes the state change.
 * @returns The new state after applying the action.
 */
const homeStateReducer = (state: HomeState, action: HomeStateAction) => {
  switch (action.type) {
    case "CHANGE_CREATE_TEST_REQUEST_STATUS":
      return {
        ...state,
        createTestRequestStatus: action.payload,
      };
    case "CHANGE_GET_TESTS_REQUEST_STATUS":
      return {
        ...state,
        getTestsRequestStatus: action.payload,
      };

    default:
      return state;
  }
};

export default homeStateReducer;
