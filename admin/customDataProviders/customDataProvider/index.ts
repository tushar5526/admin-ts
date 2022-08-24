import merge from "lodash/merge";
import buildDataProvider, { Options } from "ra-data-graphql";
import { buildGqlQuery } from "../buildGqlQuery";
import {
  buildApolloArgs,
  BuildApolloArgs,
  buildArgs,
  BuildArgs,
  buildMetaArgs,
  BuildMetaArgs,
} from "../buildGqlQuery/buildArgs";
import { buildFields, BuildFields } from "../buildGqlQuery/buildFields";
import { buildQueryFactory } from "../buildQuery";
import {
  BuildVariables,
  buildVariables as defaultBuildVariables,
} from "../buildVariables";
import {
  getResponseParser as defaultGetResponseParser,
  GetResponseParser,
} from "../getResponseParser";
import {
  CREATE,
  DELETE,
  DELETE_MANY,
  GET_LIST,
  GET_MANY,
  GET_MANY_REFERENCE,
  GET_ONE,
  UPDATE,
  UPDATE_MANY,
} from "../helpers/fetchActions";
import type { IntrospectionResult } from "../types";

const defaultOptions: Partial<Options> = {
  introspection: {
    operationNames: {
      [GET_LIST]: (resource: any) => `${resource.name}`,
      [GET_ONE]: (resource: any) => `${resource.name}`,
      [GET_MANY]: (resource: any) => `${resource.name}`,
      [GET_MANY_REFERENCE]: (resource: any) => `${resource.name}`,
      [CREATE]: (resource: any) => `insert_${resource.name}`,
      [UPDATE]: (resource: any) => `update_${resource.name}`,
      [UPDATE_MANY]: (resource: any) => `update_${resource.name}`,
      [DELETE]: (resource: any) => `delete_${resource.name}`,
      [DELETE_MANY]: (resource: any) => `delete_${resource.name}`,
    },
  },
};

const buildGqlQueryDefaults = {
  buildFields,
  buildMetaArgs,
  buildArgs,
  buildApolloArgs,
  aggregateFieldName: (resourceName: string) => `${resourceName}_aggregate`,
};

export type BuildCustomDataProvider = (
  options: Partial<Options>,
  buildGqlQueryOverrides?: {
    buildFields?: BuildFields;
    buildMetaArgs?: BuildMetaArgs;
    buildArgs?: BuildArgs;
    buildApolloArgs?: BuildApolloArgs;
    aggregateFieldName?: (resourceName: string) => string;
  },
  customBuildVariables?: BuildVariables,
  customGetResponseParser?: GetResponseParser
) => ReturnType<typeof buildDataProvider>;

export const buildCustomDataProvider: BuildCustomDataProvider = (
  options = {},
  buildGqlQueryOverrides = {},
  customBuildVariables = defaultBuildVariables,
  customGetResponseParser = defaultGetResponseParser
) => {
  const buildGqlQueryOptions = {
    ...buildGqlQueryDefaults,
    ...buildGqlQueryOverrides,
  };

  const customBuildGqlQuery = (introspectionResults: IntrospectionResult) =>
    buildGqlQuery(
      introspectionResults,
      buildGqlQueryOptions.buildFields,
      buildGqlQueryOptions.buildMetaArgs,
      buildGqlQueryOptions.buildArgs,
      buildGqlQueryOptions.buildApolloArgs,
      buildGqlQueryOptions.aggregateFieldName
    );

  const buildQuery = buildQueryFactory(
    customBuildVariables,
    customBuildGqlQuery,
    customGetResponseParser
  );

  return buildDataProvider(merge({}, defaultOptions, { buildQuery }, options));
};
