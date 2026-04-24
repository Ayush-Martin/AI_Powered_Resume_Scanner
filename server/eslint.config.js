import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

export default [

  // Base JS recommended rules
  js.configs.recommended,

  // TypeScript recommended rules
  ...tseslint.configs.recommended,

  {
    files: ["**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json"
      },
      globals: {
        ...globals.node
      }
    },
    rules: {

      // Best practice rules
      "no-console": "warn",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" }
      ],

      // Clean architecture discipline
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",

      // Consistency
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
      "indent": ["error", 2],

      // Prevent common backend mistakes
      "no-duplicate-imports": "error",
      "no-var": "error",
      "prefer-const": "error"
    }
  }
];