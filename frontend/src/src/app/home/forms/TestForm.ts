import * as z from "zod";

/**
 * Represents the schema for the TestForm.
 */
export const TestFormSchema = z.object({
  /**
   * The name field of the TestForm.
   * Must be a string with a minimum length of 5 characters.
   */
  name: z
    .string()
    .min(5, { message: "O campo nome deve ter no mínimo 5 caracteres" }),
});

/**
 * Represents the type of the TestForm.
 */
export type TestFormType = z.infer<typeof TestFormSchema>;
