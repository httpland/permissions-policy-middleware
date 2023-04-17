import { BuildOptions } from "https://deno.land/x/dnt@0.34.0/mod.ts";

export const makeOptions = (version: string): BuildOptions => ({
  test: false,
  shims: {},
  compilerOptions: {
    lib: ["dom", "esnext"],
  },
  typeCheck: true,
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  package: {
    name: "@httpland/permissions-policy-middleware",
    version,
    description: "HTTP permissions policy middleware",
    keywords: [
      "http",
      "middleware",
      "permissions-policy",
      "permissions",
      "policy",
      "permissions-policy-report-only",
    ],
    license: "MIT",
    homepage: "https://github.com/httpland/permissions-policy-middleware",
    repository: {
      type: "git",
      url: "git+https://github.com/httpland/permissions-policy-middleware.git",
    },
    bugs: {
      url: "https://github.com/httpland/permissions-policy-middleware/issues",
    },
    sideEffects: false,
    type: "module",
    publishConfig: {
      access: "public",
    },
  },
  packageManager: "pnpm",
  mappings: {
    "https://esm.sh/kebab-case@1.0.2?pin=v114": {
      name: "kebab-case",
      version: "1.0.2",
    },
    "https://deno.land/x/http_middleware@1.0.0/mod.ts": {
      name: "@httpland/http-middleware",
      version: "1.0.0",
    },
    "https://deno.land/x/isx@1.3.0/is_string.ts": {
      name: "@miyauci/isx",
      version: "1.3.0",
      subPath: "is_string.js",
    },
    "https://deno.land/x/isx@1.3.0/is_non_nullable.ts": {
      name: "@miyauci/isx",
      version: "1.3.0",
      subPath: "is_non_nullable.js",
    },
    "https://deno.land/x/http_utils@1.0.0/message.ts": {
      name: "@httpland/http-utils",
      version: "1.0.0",
      subPath: "message.js",
    },
    "https://deno.land/x/sfv_parser@1.1.0/mod.ts": {
      name: "@httpland/sfv-parser",
      version: "1.1.0",
    },
  },
});
