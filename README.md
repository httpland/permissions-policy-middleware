# permissions-policy-middleware

[![deno land](http://img.shields.io/badge/available%20on-deno.land/x-lightgrey.svg?logo=deno)](https://deno.land/x/permissions_policy_middleware)
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/permissions_policy_middleware/mod.ts)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/httpland/permissions-policy-middleware)](https://github.com/httpland/permissions-policy-middleware/releases)
[![codecov](https://codecov.io/github/httpland/permissions-policy-middleware/branch/main/graph/badge.svg)](https://codecov.io/gh/httpland/permissions-policy-middleware)
[![GitHub](https://img.shields.io/github/license/httpland/permissions-policy-middleware)](https://github.com/httpland/permissions-policy-middleware/blob/main/LICENSE)

[![test](https://github.com/httpland/permissions-policy-middleware/actions/workflows/test.yaml/badge.svg)](https://github.com/httpland/permissions-policy-middleware/actions/workflows/test.yaml)
[![NPM](https://nodei.co/npm/@httpland/permissions-policy-middleware.png?mini=true)](https://nodei.co/npm/@httpland/permissions-policy-middleware/)

HTTP permissions policy middleware.

Compliant with
[W3C, Permissions Policy](https://www.w3.org/TR/permissions-policy/).

## Middleware

For a definition of Universal HTTP middleware, see the
[http-middleware](https://github.com/httpland/http-middleware) project.

## Usage

Middleware adds the `Permissions-Policy` header to the response.

```ts
import {
  type Handler,
  permissionsPolicy,
} from "https://deno.land/x/permissions_policy_middleware@$VERSION/mod.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";

declare const request: Request;
declare const handler: Handler;

const middleware = permissionsPolicy({ features: { autoplay: "*", usb: [] } });
const response = await middleware(request, handler);

assert(response.headers.has("permissions-policy"));
```

yield:

```http
Permissions-Policy: autoplay=*, usb=()
```

## Options

Middleware require options argument.

It is following fields:

| Name       | Type                       | Required | Description                                       |
| ---------- | -------------------------- | :------: | ------------------------------------------------- |
| features   | `PolicyControlledFeatures` |   　✅   | Policy controlled feature name and value mapping. |
| reportTo   | `string`                   |   　-    | Representation of `report-to` directive.          |
| reportOnly | `boolean`                  |   　-    | Whether header is report-only or not.             |

### Features

`features` specifies a map of permissions policy feature name and value.

All
[policy controlled features](https://github.com/w3c/webappsec-permissions-policy/blob/main/features.md)
are supported.

```ts
import {
  permissionsPolicy,
} from "https://deno.land/x/permissions_policy_middleware@$VERSION/mod.ts";

const middleware = permissionsPolicy({
  features: {
    camera: "*",
    payment: [],
    pictureInPicture: ["self", "https://test.example"],
  },
});
```

yield:

```http
Permissions-Policy: camera=*, payment=(), picture-in-picture=(self "https://test.example")
```

### Report to

Specify the `report-to` directive for the Reporting API.

```ts
import {
  permissionsPolicy,
} from "https://deno.land/x/permissions_policy_middleware@$VERSION/mod.ts";

const middleware = permissionsPolicy({
  features: {},
  reportTo: "default",
});
```

yield:

```http
Permissions-Policy: report-to=default
```

### Report only

The header field changes depending on the value of `reportOnly`.

| Value   | Header field                   |
| ------- | ------------------------------ |
| `true`  | Permissions-Policy-Report-Only |
| `false` | Permissions-Policy             |

The default `reportOnly` is `false`.

```ts
import {
  type Handler,
  permissionsPolicy,
} from "https://deno.land/x/permissions_policy_middleware@$VERSION/mod.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";

declare const request: Request;
declare const handler: Handler;

const middleware = permissionsPolicy({ features: {}, reportOnly: true });
const response = await middleware(request, handler);

assert(response.headers.has("permissions-policy-report-only"));
```

### Serialization

`features` and `reportTo` will serialize into
[structured field value](https://www.rfc-editor.org/rfc/rfc8941.html).

If the feature value is other than `*` and `self`, it is assumed to be an ASCII
origin.

```ts
import {
  permissionsPolicy,
} from "https://deno.land/x/permissions_policy_middleware@$VERSION/mod.ts";

const middleware = permissionsPolicy({
  features: { geolocation: "https://text.example/geolocation" },
});
```

yield:

```http
Permissions-Policy: geolocation=https://text.example
```

#### Serialization error

If serialization fails, an error may be thrown.

Cases that throw an error are as follows:

- `features` value is invalid
  [allowlist](https://www.w3.org/TR/permissions-policy/#allowlist)
- `reportTo` is invalid
  [`sf-token`](https://www.rfc-editor.org/rfc/rfc8941.html#section-3.3.4-3)
  format

```ts
import { permissionsPolicy } from "https://deno.land/x/permissions_policy_middleware@$VERSION/middleware.ts";
import { assertThrows } from "https://deno.land/std/testing/asserts.ts";

assertThrows(() =>
  permissionsPolicy({ features: { battery: "<invalid:origin>" } })
);
assertThrows(() =>
  permissionsPolicy({ features: {}, reportTo: "<invalid:sf-token>" })
);
```

## Effects

Middleware may make changes to the following elements of the HTTP message.

- HTTP Headers
  - Permissions-Policy
  - Permissions-Policy-Report-Only

## Conditions

Middleware will execute if all of the following conditions are met:

Depends on [reportOnly](#report-only):

- `Permissions-Policy` header does not exist in response
- `Permissions-Policy-Report-Only` header does not exist in response

## API

All APIs can be found in the
[deno doc](https://doc.deno.land/https/deno.land/x/permissions_policy_middleware/mod.ts).

## License

Copyright © 2023-present [httpland](https://github.com/httpland).

Released under the [MIT](./LICENSE) license
