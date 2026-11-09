import eslint from "@eslint/js"
import tseslint from "typescript-eslint"
import prettier from "eslint-config-prettier"

export default [
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      ".nx/**",
      "apps/shop-app/public/scripts/**",
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
]
