import {
  type Options,
  permissionsPolicy,
  ResolvedOptions,
  resolveOptions,
} from "./middleware.ts";
import {
  assert,
  assertEquals,
  assertIsError,
  assertThrows,
  describe,
  equalsResponse,
  Header,
  it,
} from "./_dev_deps.ts";

describe("resolveOptions", () => {
  it("should return field name and value", () => {
    const table: [Options, ResolvedOptions][] = [
      [
        { features: {} },
        {
          fieldName: Header.PermissionsPolicy,
          fieldValue: "",
        },
      ],
      [
        { features: {}, reportOnly: true },
        {
          fieldName: Header.PermissionsPolicyReportOnly,
          fieldValue: "",
        },
      ],
      [
        { features: {}, reportTo: "default" },
        {
          fieldName: Header.PermissionsPolicy,
          fieldValue: "report-to=default",
        },
      ],
      [
        {
          features: { accelerometer: "*", webShare: ["*"] },
          reportTo: "default",
        },
        {
          fieldName: Header.PermissionsPolicy,
          fieldValue: "accelerometer=*, web-share=(*), report-to=default",
        },
      ],
      [
        {
          features: {
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
        },
        {
          fieldName: Header.PermissionsPolicy,
          fieldValue:
            "accelerometer=(), ambient-light-sensor=(), autoplay=(), battery=(), bluetooth=(), browsing-topics=(), camera=(), ch-ua=(), ch-ua-arch=(), ch-ua-bitness=(), ch-ua-full-version=()",
        },
      ],
      [{ features: { accelerometer: "https://test.example/" } }, {
        fieldName: Header.PermissionsPolicy,
        fieldValue: `accelerometer="https://test.example"`,
      }],
      [{ features: { accelerometer: "https://あ亜.example/" } }, {
        fieldName: Header.PermissionsPolicy,
        fieldValue: `accelerometer="${
          new URL("https://あ亜.example/").origin
        }"`,
      }],
    ];

    table.forEach(([input, expected]) => {
      assertEquals(resolveOptions(input), expected);
    });
  });
});

describe("permissionsPolicy", () => {
  it("should return same response if the response include header", async () => {
    const middleware = permissionsPolicy({ features: {} });
    const initResponse = new Response(null, {
      headers: {
        [Header.PermissionsPolicy]: "",
      },
    });

    const response = await middleware(new Request("test:"), () => initResponse);

    assert(response === initResponse);
  });

  it("should return response what include Permissions-Policy header", async () => {
    const middleware = permissionsPolicy({ features: {} });

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
    const middleware = permissionsPolicy({
      features: { autoplay: "*" },
      reportOnly: true,
      reportTo: "default",
    });

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
    const table: Options[] = [];

    table.forEach((input) => {
      assertThrows(() => permissionsPolicy(input));
    });
  });

  it("should be error message if the feature value is invalid", () => {
    let err;

    try {
      permissionsPolicy({ features: { accelerometer: "" } });
    } catch (e) {
      err = e;
    } finally {
      assertIsError(err, Error, `Invalid URL: ''`);
    }
  });

  it("should be error message if the reportTo is invalid", () => {
    let err;

    try {
      permissionsPolicy({ features: {}, reportTo: "<invalid>" });
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
