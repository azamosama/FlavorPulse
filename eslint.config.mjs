import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Ensure no unused variables or imports
      "@typescript-eslint/no-unused-vars": [
        "warn", // Or "error" if you prefer to block commits with unused vars
        {
          argsIgnorePattern: "^_", // Ignore variables that start with _
          varsIgnorePattern: "^_", // Ignore variables that start with _
        },
      ],
      "@typescript-eslint/no-unused-expressions": "off", // Disable if expression-related errors are frequent
       "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
// Warn when console logs are used
    },
  },
];

export default eslintConfig;
