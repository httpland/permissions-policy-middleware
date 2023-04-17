// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

import {
  filterValues,
  isNonNullable,
  kebabCase,
  mapKeys,
  type Middleware,
  withHeader,
} from "./deps.ts";
import { stringifyPermissionsPolicy } from "./utils.ts";
import { Header } from "./constants.ts";
import type { PermissionsPolicy, PermissionsPolicyFeatures } from "./types.ts";
import type { PolicyControlledFeatures } from "./features.ts";

/** Middleware options. */
export interface PermissionsPolicyOptions
  extends Pick<PermissionsPolicy, "reportTo"> {
  /** Whether header is report-only or not.
   * Depending on the value, the header will be:
   * - `true`: `Permissions-Policy-Report-Only`
   * - `false`: `Permissions-Policy`
   * @default false
   */
  readonly reportOnly?: boolean;
}

const DEFAULT_OPTIONS: PermissionsPolicyOptions = {
  reportOnly: false,
};

/** Create permissions policy middleware.
 *
 * @example
 * ```ts
 * import {
 *   type Handler,
 *   permissionsPolicy,
 * } from "https://deno.land/x/permissions_policy_middleware@$VERSION/mod.ts";
 * import { assert } from "https://deno.land/std/testing/asserts.ts";
 *
 * declare const request: Request;
 * declare const handler: Handler;
 *
 * const middleware = permissionsPolicy({ autoplay: "*", usb: [] });
 * const response = await middleware(request, handler);
 *
 * assert(response.headers.has("permissions-policy"));
 * ```
 *
 * @throws {Error} If the {@link PolicyControlledFeatures} is invalid.
 * @throws {Error} If the {@link PermissionsPolicyOptions.reportTo} is invalid.
 */
export function permissionsPolicy(
  features: PolicyControlledFeatures,
  options: PermissionsPolicyOptions = DEFAULT_OPTIONS,
): Middleware {
  const { reportOnly = DEFAULT_OPTIONS.reportOnly, reportTo } = options;
  const normalizedFeatures = normalizeFeatures(features);
  const fieldValue = stringifyPermissionsPolicy({
    features: normalizedFeatures,
    reportTo,
  });
  const fieldName = reportOnly
    ? Header.PermissionsPolicyReportOnly
    : Header.PermissionsPolicy;

  return async (request, next) => {
    const response = await next(request);

    if (response.headers.has(fieldName)) return response;

    return withHeader(response, fieldName, fieldValue);
  };
}

/** Normalize policy controlled features. */
export function normalizeFeatures(
  features: PolicyControlledFeatures,
): PermissionsPolicyFeatures {
  const filtered = mapKeys(
    filterValues({ ...features }, isNonNullable) as PermissionsPolicyFeatures,
    kebabCase,
  );

  return filtered;
}
