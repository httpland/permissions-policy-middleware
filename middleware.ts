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
import { DirectiveValue, Header } from "./constants.ts";
import type { PermissionsPolicyFeatures } from "./types.ts";
import type { PolicyControlledFeatures } from "./features.ts";

/** Middleware options. */
export interface Options {
  readonly features: PolicyControlledFeatures;
  readonly reportTo?: string;

  /**
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
  fieldName: string;
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
    directives: { [DirectiveValue.ReportTo]: reportTo },
  });
  const fieldName = reportOnly
    ? Header.PermissionsPolicyReportOnly
    : Header.PermissionsPolicy;

  return {
    fieldName,
    fieldValue,
  };
}
