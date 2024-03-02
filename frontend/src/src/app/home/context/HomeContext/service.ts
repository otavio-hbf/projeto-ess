/**
 * Service class for handling API requests related to the HomeContext in the application.
 */
import { Dispatch } from "react";
import { HomeStateAction } from "./types";
import { ApiService } from "../../../../shared/services/ApiService";
import RequestStatus from "../../../../shared/types/request-status";
import { TestFormType } from "../../forms/TestForm";
import TestModel from "../../models/TestModel";
import { AppUnknownError } from "../../../../shared/errors/app-error";

export default class HomeService {
  private apiService: ApiService;
  private dispatch: Dispatch<HomeStateAction>;

  /**
   * Constructs a new instance of the HomeService class.
   * @param apiService The ApiService instance used for making API requests.
   * @param dispatch The dispatch function from the HomeContext reducer.
   */
  constructor({
    apiService,
    dispatch,
  }: {
    apiService: ApiService;
    dispatch: Dispatch<HomeStateAction>;
  }) {
    this.apiService = apiService;
    this.dispatch = dispatch;
  }

  /**
   * Creates a new test.
   * @param testForm The form data for creating the test.
   * @returns A promise that resolves when the test is created.
   */
  async createTest(testForm: TestFormType): Promise<void> {
    this.dispatch({
      type: "CHANGE_CREATE_TEST_REQUEST_STATUS",
      payload: RequestStatus.loading(),
    });

    const result = await this.apiService.post("/tests", testForm);

    result.handle({
      onSuccess: (response) => {
        this.dispatch({
          type: "CHANGE_CREATE_TEST_REQUEST_STATUS",
          payload: RequestStatus.success(response),
        });
      },
      onFailure: (error) => {
        this.dispatch({
          type: "CHANGE_CREATE_TEST_REQUEST_STATUS",
          payload: RequestStatus.failure(error),
        });
      },
    });
  }

  /**
   * Retrieves the list of tests.
   * @returns A promise that resolves when the tests are retrieved.
   */
  async getTests(): Promise<void> {
    try {
      this.dispatch({
        type: "CHANGE_GET_TESTS_REQUEST_STATUS",
        payload: RequestStatus.loading(),
      });

      const result = await this.apiService.get("/tests");

      result.handle({
        onSuccess: (response) => {
          const tests = response.data.map((test: any) => new TestModel(test));

          this.dispatch({
            type: "CHANGE_GET_TESTS_REQUEST_STATUS",
            payload: RequestStatus.success(tests),
          });
        },
        onFailure: (error) => {
          this.dispatch({
            type: "CHANGE_GET_TESTS_REQUEST_STATUS",
            payload: RequestStatus.failure(error),
          });
        },
      });
    } catch (_) {
      this.dispatch({
        type: "CHANGE_GET_TESTS_REQUEST_STATUS",
        payload: RequestStatus.failure(new AppUnknownError()),
      });
    }
  }
}
