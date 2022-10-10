import gql from "graphql-tag";

// Define the additional fields that we want.
export const EXTENDED_GRADE_ASSESSMENT_RECORD = gql`
  {    
    assessment {
      type
    }
    school {
        location {
          block
          cluster
          district
        }
    }
  }
`;