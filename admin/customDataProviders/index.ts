import buildQuery from "./buildQuery";

export { buildGqlQuery } from "./buildGqlQuery";
export type { BuildGqlQuery } from "./buildGqlQuery";
export {
  buildApolloArgs,
  buildArgs,
  buildMetaArgs,
} from "./buildGqlQuery/buildArgs";
export type {
  BuildApolloArgs,
  BuildArgs,
  BuildMetaArgs,
} from "./buildGqlQuery/buildArgs";
export { customBuildFields } from "./buildGqlQuery/buildFields";
export type { BuildFields } from "./buildGqlQuery/buildFields";
export type { BuildQuery, BuildQueryFactory } from "./buildQuery";
export { buildVariables } from "./buildVariables";
export type { BuildVariables } from "./buildVariables";
import { buildCustomDataProvider as buildHasuraProvider } from "./customDataProvider";

export type { BuildCustomDataProvider } from "./customDataProvider";
export { getResponseParser } from "./getResponseParser";
export type { GetResponseParser } from "./getResponseParser";
export { FetchType } from "./types";
export { buildQuery };
import { ApolloClient, InMemoryCache } from "@apollo/client";

const getDataProvider = async (session: any = {}) => {
  const hasuraHeaders: any = {};
  hasuraHeaders.Authorization = `Bearer ${session.jwt}`;
  if (session.role) hasuraHeaders["x-hasura-role"] = session.role;

  const apolloClient = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_HASURA_URL,
    cache: new InMemoryCache(),
    headers: hasuraHeaders,
  });
  return buildHasuraProvider({ client: apolloClient });
};
export default getDataProvider;
