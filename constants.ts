// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

export const enum Header {
  PermissionsPolicy = "permissions-policy",
  PermissionsPolicyReportOnly = `${Header.PermissionsPolicy}-report-only`,
}

export const enum AllowListValue {
  Star = "*",
  Self = "self",
  Src = "src",
  None = "none",
}

export const enum DirectiveValue {
  ReportTo = "report-to",
}
