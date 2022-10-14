import { TypeKind, IntrospectionObjectType, FieldNode } from "graphql";
import * as gqlTypes from "graphql-ast-types-browser";
import getFinalType from "../helpers/getFinalType";
import { FetchType } from "../types";

// Extending the nested query
import { EXTENDED_GRADE_ASSESSMENT_RECORD } from "../../customQuery/gradeAssessment";
import { EXTENDED_STUDENT_RECORD } from "../../customQuery/student" 
import { EXTENDED_SCHOOL_RECORD } from "../../customQuery/school";
import { EXTENDED_ASSESSMENT_RECORD} from "../../customQuery/assessment";
import {EXTENDED_SCHOOL_MAPPING_RECORD} from "../../customQuery/school_mapping"
import { buildFields } from "ra-data-hasura";

export type BuildFields = (
  type: IntrospectionObjectType,
  aorFetchType?: FetchType
) => FieldNode[];

const extractFieldsFromQuery = (queryAst: any) => {
  return queryAst.definitions[0].selectionSet.selections;
};

export const customBuildFields: BuildFields = (type, fetchType: any) => {
  const resourceName = type.name;
  const defaultFields = buildFields(type, fetchType);

  if (resourceName === "grade_assessment") {
    if (["GET_LIST", "GET_ONE", "DELETE", "DELETE_MANY"].includes(fetchType)) {
      const relatedEntities = extractFieldsFromQuery(
        EXTENDED_GRADE_ASSESSMENT_RECORD
      );
      defaultFields.push(...relatedEntities);
    }
    return defaultFields;
  }

  if (resourceName === "student" || resourceName === "teacher") {
    if (["GET_LIST", "GET_ONE", "DELETE", "DELETE_MANY"].includes(fetchType)) {
      const relatedEntities = extractFieldsFromQuery(
        EXTENDED_STUDENT_RECORD
      );
      defaultFields.push(...relatedEntities);
    }
    return defaultFields;
  }

  if (resourceName === "school") {
    if (["GET_LIST", "GET_ONE", "DELETE", "DELETE_MANY"].includes(fetchType)) {
      const relatedEntities = extractFieldsFromQuery(
        EXTENDED_SCHOOL_RECORD
      );
      defaultFields.push(...relatedEntities);
    }
    return defaultFields;
  }

  if (resourceName === "assessment") {
    if (["GET_LIST", "GET_ONE", "DELETE", "DELETE_MANY"].includes(fetchType)) {
      const relatedEntities = extractFieldsFromQuery(
        EXTENDED_ASSESSMENT_RECORD
      );
      defaultFields.push(...relatedEntities);
    }
    return defaultFields;
  }

  if (resourceName === "ss_school_allocation_data") {
    if (["GET_LIST", "GET_ONE", "DELETE", "DELETE_MANY"].includes(fetchType)) {
      const relatedEntities = extractFieldsFromQuery(
        EXTENDED_SCHOOL_MAPPING_RECORD
      );
      defaultFields.push(...relatedEntities);
    }
    return defaultFields;
  }
  return type.fields.reduce((acc, field) => {
    const type = getFinalType(field.type);
    if (type.kind !== TypeKind.OBJECT && type.kind !== TypeKind.INTERFACE) {
      return [...acc, gqlTypes.field(gqlTypes.name(field.name))];
    }

    return acc;
  }, [] as FieldNode[]);
};
