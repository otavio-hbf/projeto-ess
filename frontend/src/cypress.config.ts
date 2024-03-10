import { defineConfig } from "cypress";
import cucumberPreprocessor from "@badeball/cypress-cucumber-preprocessor";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";
import Cookies from "universal-cookie";

export default defineConfig({
  video: false,
  viewportWidth: 1280,
  viewportHeight: 720,
  defaultCommandTimeout: 10000,
  execTimeout: 60000,
  retries: {
    runMode: 1,
    openMode: 0,
  },
  chromeWebSecurity: false,
  env: {
    codeCoverage: {
      exclude: ["cypress/**/*.*", "coverage/**/*.*"],
    },
  },
  e2e: {
    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ): Promise<Cypress.PluginConfigOptions> {
      await cucumberPreprocessor.addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      on("before:spec", (details) => {
        /* code that needs to run before all specs */
        const cookies = new Cookies();
        cookies.set("userId", "2");

        // details.specs and details.browser will be undefined in interactive mode
        console.log("Running before");
      });

      // TODO: Fix coverage
      // coverageTask(on, config);

      return config;
    },
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/e2e/**/*.feature",
    experimentalInteractiveRunEvents: true,
  },
});
