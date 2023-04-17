// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

import {
  Dictionary,
  InnerList,
  isString,
  Item,
  String,
  stringifySfv,
  Token,
} from "./deps.ts";
import { AllowListValue, DirectiveValue } from "./constants.ts";
import type {
  AllowList,
  PermissionsPolicy,
  PermissionsPolicyDirectives,
} from "./types.ts";

/** Serialize {@link PermissionsPolicy} into string.
 * @throws {Error} It the policy is invalid.
 */
export function stringifyPermissionsPolicy(
  policy: Readonly<PermissionsPolicy>,
): string {
  const { directives, features } = policy;

  const entries = directives2Parameters(directives);
  const nodes = Object.entries(features).map(entry2Tuple).concat(entries);
  const sfv = new Dictionary(nodes);

  return stringifySfv(sfv);
}

function parseTokenOrString(input: string): Token | String {
  switch (input) {
    case AllowListValue.Star:
    case AllowListValue.Self: {
      return new Token(input);
    }

    default: {
      return new String(new URL(input).toString());
    }
  }
}

function entry2Tuple(
  [key, value]: readonly [string, AllowList | readonly AllowList[]],
): [key: string, value: Item | InnerList] {
  return [
    key,
    isString(value) ? new Item(parseTokenOrString(value)) : new InnerList(
      value.map(parseTokenOrString).map(createItem),
    ),
  ];
}

function createItem(input: Token | String): Item {
  return new Item(input);
}

function directives2Parameters(
  directives: PermissionsPolicyDirectives,
): [string, Item][] {
  const reportTo = directives[DirectiveValue.ReportTo];

  return isString(reportTo)
    ? [[DirectiveValue.ReportTo, new Item(new Token(reportTo))]]
    : [];
}
