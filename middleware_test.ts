import { normalizeFeatures, permissionsPolicy } from "./middleware.ts";
import {
  assert,
  assertEquals,
  assertIsError,
  assertThrows,
  describe,
  equalsResponse,
  Header,
  it,
  type PermissionsPolicyFeatures,
  type PolicyControlledFeatures,
} from "./_dev_deps.ts";

describe("normalizeFeatures", () => {
  it("should return field name and value", () => {
    const table: [PolicyControlledFeatures, PermissionsPolicyFeatures][] = [
      [
        {},
        {},
      ],
      [
        { accelerometer: "*", webShare: ["*"] },
        { accelerometer: "*", "web-share": ["*"] },
      ],
      [
        { accelerometer: undefined },
        {},
      ],
      [
        {
          accelerometer: [],
          ambientLightSensor: [],
          autoplay: [],
          battery: [],
          bluetooth: [],
          browsingTopics: [],
          camera: [],
          chUa: [],
          chUaArch: [],
          chUaBitness: [],
          chUaFullVersion: [],
        },
        {
          accelerometer: [],
          "ambient-light-sensor": [],
          autoplay: [],
          battery: [],
          bluetooth: [],
          "browsing-topics": [],
          camera: [],
          "ch-ua": [],
          "ch-ua-arch": [],
          "ch-ua-bitness": [],
          "ch-ua-full-version": [],
        },
      ],
    ];

    table.forEach(([input, expected]) => {
      assertEquals(normalizeFeatures(input), expected);
    });
  });
});

describe("permissionsPolicy", () => {
  it("should return same response if the response include header", async () => {
    const middleware = permissionsPolicy({});
    const initResponse = new Response(null, {
      headers: {
        [Header.PermissionsPolicy]: "",
      },
    });

    const response = await middleware(new Request("test:"), () => initResponse);

    assert(response === initResponse);
  });

  it("should return response what include Permissions-Policy header", async () => {
    const middleware = permissionsPolicy({});

    const response = await middleware(
      new Request("test:"),
      () => new Response(),
    );

    assert(
      await equalsResponse(
        response,
        new Response(null, {
          headers: {
            [Header.PermissionsPolicy]: ``,
          },
        }),
        true,
      ),
    );
  });

  it("should return response what include Permissions-Policy-Report-Only header", async () => {
    const middleware = permissionsPolicy(
      { autoplay: "*" },
      {
        reportOnly: true,
        reportTo: "default",
      },
    );

    const response = await middleware(
      new Request("test:"),
      () => new Response(),
    );

    assert(
      await equalsResponse(
        response,
        new Response(null, {
          headers: {
            [Header.PermissionsPolicyReportOnly]:
              `autoplay=*, report-to=default`,
          },
        }),
        true,
      ),
    );
  });

  it("should throw error if the features include invalid value", () => {
    const table: PolicyControlledFeatures[] = [
      { accelerometer: "" },
      { chUaModel: [""] },
    ];

    table.forEach((input) => {
      assertThrows(() => permissionsPolicy(input));
    });
  });

  it("should be error message if the feature value is invalid", () => {
    let err;

    try {
      permissionsPolicy({ accelerometer: "" });
    } catch (e) {
      err = e;
    } finally {
      assertIsError(err, Error, `Invalid URL: ''`);
    }
  });

  it("should be error message if the reportTo is invalid", () => {
    let err;

    try {
      permissionsPolicy({}, { reportTo: "<invalid>" });
    } catch (e) {
      err = e;
    } finally {
      assertIsError(
        err,
        Error,
        `invalid <sf-token> format. Token { "<invalid>" }`,
      );
    }
  });
});
