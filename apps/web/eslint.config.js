import { nextJsConfig } from "@repo/eslint-config/next-js";

/** @type {import("eslint").Linter.Config} */
const config = {
    ...nextJsConfig,
    rules: {
        "@next/next/no-img-element": "off"
    }
};

export default config;
