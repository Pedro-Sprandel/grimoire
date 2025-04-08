import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { files: ["**/*.{js,mjs,cjs,ts}"], languageOptions: { globals: globals.node } },
  { files: ["**/*.{js,mjs,cjs,ts}"], plugins: { js }, extends: ["js/recommended"] },
  tseslint.configs.recommended,
  {
    rules: {
      semi: ["error", "always"],
      indent: ["error", 2],
      quotes: ["error", "double"],
      "comma-dangle": ["error", "never"],
      eqeqeq: "error",
      "no-trailing-spaces": "error",
      "no-console": "warn",
      curly: "error",
      "default-case": "error",
      "global-require": "error",
      "handle-callback-err": "warn"
    }
  }
]);