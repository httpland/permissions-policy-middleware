// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

import { type AllowListValue } from "./constants.ts";

/** Permissions policy feature name and value mapping. */
export interface PermissionsPolicyFeatures {
  readonly [k: string]: AllowList | readonly AllowList[];
}

/** Permission policy API. */
export interface PermissionsPolicy {
  /** Features name and value mapping. */
  readonly features: PermissionsPolicyFeatures;

  /** Representation of "report-to" directive. */
  readonly reportTo?: string;
}

/** Permissions policy allowlist. */
export type AllowList =
  | `${AllowListValue.Star}`
  | `${AllowListValue.Self}`
  // deno-lint-ignore ban-types
  | (string & String);
