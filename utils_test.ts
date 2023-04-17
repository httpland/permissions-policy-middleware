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
      [{ features: {}, directives: {} }, ""],
      [{ features: { "abc": "*" }, directives: {} }, "abc=*"],
      [
        { features: { "abc": "*", "def": "self" }, directives: {} },
        "abc=*, def=self",
      ],
      [
        { features: { "def": "self", "abc": "*" }, directives: {} },
        "def=self, abc=*",
      ],
      [
        { features: { "abc": ["*"] }, directives: {} },
        "abc=(*)",
      ],
      [
        { features: { "abc": ["self"] }, directives: {} },
        "abc=(self)",
      ],
      [
        { features: { "abc": "https://test.example" }, directives: {} },
        `abc="https://test.example/"`,
      ],
      [
        { features: { "abc": "https://test.example/" }, directives: {} },
        `abc="https://test.example/"`,
      ],
      [
        { features: { "abc": "https://test.example/hoge" }, directives: {} },
        `abc="https://test.example/hoge"`,
      ],
      [
        { features: { "abc": ["https://test.example/"] }, directives: {} },
        `abc=("https://test.example/")`,
      ],
      [
        { features: { "abc": "https://あ.example/" }, directives: {} },
        `abc="https://xn--l8j.example/"`,
      ],
      [
        {
          features: {
            "abc": ["https://test.example/", "https://cdn.test.example/"],
          },
          directives: {},
        },
        `abc=("https://test.example/" "https://cdn.test.example/")`,
      ],
      [
        {
          features: {
            "abc": ["https://test.example/", "https://test.example/"],
          },
          directives: {},
        },
        `abc=("https://test.example/" "https://test.example/")`,
      ],
      [
        {
          features: {},
          directives: {
            "report-to": "default",
          },
        },
        `report-to=default`,
      ],
      [
        {
          features: {
            "abc": "*",
          },
          directives: {
            "report-to": "default",
          },
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
      { features: { "": "" }, directives: {} },
      { features: { "": "*" }, directives: {} },
      { features: { "a": "あ" }, directives: {} },
      { features: { "a": "*" }, directives: { "report-to": "" } },
    ];

    table.forEach((input) => {
      assertThrows(() => stringifyPermissionsPolicy(input));
    });
  });
});
