import gql from "graphql-tag";

// Define the additional fields that we want.
export const EXTENDED_SCHOOL_MAPPING_RECORD = gql`
  {    
    school {
        name
        udise
        location {
          block
          cluster
          district
        }
    }
  }
`;
