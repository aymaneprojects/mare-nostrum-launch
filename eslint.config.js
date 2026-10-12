import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  {
    // Aucun tiret cadratin dans un texte du site (demande du propriétaire, oct. 2026).
    // Les commentaires restent libres ; écrire \u2014 si le caractère est vraiment nécessaire.
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-syntax": ["error",
        { selector: "JSXText[value=/\u2014/]", message: "Pas de tiret cadratin « — » sur le site : utiliser « - », une virgule ou deux-points." },
        { selector: "Literal[value=/\u2014/]", message: "Pas de tiret cadratin « — » sur le site : utiliser « - », une virgule ou deux-points." },
        { selector: "TemplateElement[value.raw=/\u2014/]", message: "Pas de tiret cadratin « — » sur le site : utiliser « - », une virgule ou deux-points." },
      ],
    },
  },
);
