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
export interface Options extends Pick<PermissionsPolicy, "reportTo"> {
  /** Policy controlled feature name and value mapping. */
  readonly features: PolicyControlledFeatures;

  /** Whether header is report-only or not.
   * Depending on the value, the header will be:
   * - `true`: `Permissions-Policy-Report-Only`
   * - `false`: `Permissions-Policy`
   * @default false
   */
  readonly reportOnly?: boolean;
}

/** Create permissions policy middleware.
 *
 * @throws {Error} If the {@link Options} is invalid.
 */
export function permissionsPolicy(options: Options): Middleware {
  const { fieldName, fieldValue } = resolveOptions(options);

  return async (request, next) => {
    const response = await next(request);

    if (response.headers.has(fieldName)) return response;

    return withHeader(response, fieldName, fieldValue);
  };
}

export interface ResolvedOptions {
  /** Serialized header field name. */
  fieldName: string;
  /** Serialized header field value. */
  fieldValue: string;
}

/**
 * @throws {Error} If the {@link Options} is invalid.
 */
export function resolveOptions(
  options: Options,
): ResolvedOptions {
  const { features, reportOnly = false, reportTo } = options;
  const filtered = mapKeys(
    filterValues({ ...features }, isNonNullable) as PermissionsPolicyFeatures,
    kebabCase,
  );
  const fieldValue = stringifyPermissionsPolicy({
    features: filtered,
    reportTo,
  });
  const fieldName = reportOnly
    ? Header.PermissionsPolicyReportOnly
    : Header.PermissionsPolicy;

  return {
    fieldName,
    fieldValue,
  };
}
