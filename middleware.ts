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
 * @throws {Error} If the {@link Options} is invalid.
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
