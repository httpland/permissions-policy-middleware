import { stringifyPermissionsPolicy } from "./utils.ts";
import {
  assertEquals,
  assertThrows,
  describe,
  it,
  type PermissionsPolicy,
} from "./_dev_deps.ts";

describe("stringifyPermissionsPolicy", () => {
  it("should return string if the permissions policy is valid", () => {
    const table: [PermissionsPolicy, string][] = [
      [{ features: {} }, ""],
      [{ features: { "abc": "*" } }, "abc=*"],
      [
        { features: { "abc": "*", "def": "self" } },
        "abc=*, def=self",
      ],
      [
        { features: { "def": "self", "abc": "*" } },
        "def=self, abc=*",
      ],
      [
        { features: { "abc": ["*"] } },
        "abc=(*)",
      ],
      [
        { features: { "abc": ["self"] } },
        "abc=(self)",
      ],
      [
        { features: { "abc": "https://test.example" } },
        `abc="https://test.example/"`,
      ],
      [
        { features: { "abc": "https://test.example/" } },
        `abc="https://test.example/"`,
      ],
      [
        { features: { "abc": "https://test.example/hoge" } },
        `abc="https://test.example/hoge"`,
      ],
      [
        { features: { "abc": ["https://test.example/"] } },
        `abc=("https://test.example/")`,
      ],
      [
        { features: { "abc": "https://あ.example/" } },
        `abc="https://xn--l8j.example/"`,
      ],
      [
        {
          features: {
            "abc": ["https://test.example/", "https://cdn.test.example/"],
          },
        },
        `abc=("https://test.example/" "https://cdn.test.example/")`,
      ],
      [
        {
          features: {
            "abc": ["https://test.example/", "https://test.example/"],
          },
        },
        `abc=("https://test.example/" "https://test.example/")`,
      ],
      [
        {
          features: {},
          reportTo: "default",
        },
        `report-to=default`,
      ],
      [
        {
          features: {
            "abc": "*",
          },
          reportTo: "default",
        },
        `abc=*, report-to=default`,
      ],
    ];

    table.forEach(([input, expected]) => {
      assertEquals(stringifyPermissionsPolicy(input), expected);
    });
  });

  it("should throw error if the input is invalid", () => {
    const table: PermissionsPolicy[] = [
      { features: { "": "" } },
      { features: { "": "*" } },
      { features: { "a": "あ" } },
      { features: { "a": "*" }, reportTo: "" },
    ];

    table.forEach((input) => {
      assertThrows(() => stringifyPermissionsPolicy(input));
    });
  });
});
