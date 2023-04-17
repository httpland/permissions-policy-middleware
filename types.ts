// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

import { type AllowListValue, DirectiveValue } from "./constants.ts";

export interface PermissionsPolicyFeatures {
  readonly [k: string]: AllowList | readonly AllowList[];
}

export interface PermissionsPolicyDirectives {
  readonly [DirectiveValue.ReportTo]?: string;
}

export interface PermissionsPolicy {
  readonly features: PermissionsPolicyFeatures;
  readonly directives: PermissionsPolicyDirectives;
}

export type AllowList =
  | `${AllowListValue.Star}`
  | `${AllowListValue.Self}`
  // deno-lint-ignore ban-types
  | (string & String);
