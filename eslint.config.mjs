import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"), // Spread the core-web-vitals rules
  ...compat.extends("plugin:@typescript-eslint/recommended"), // Spread TypeScript rules
  {
    // Additional rule customizations
    rules: {
      "@typescript-eslint/no-unused-vars": "warn", // Set to warn for unused variables
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];

export default eslintConfig;
